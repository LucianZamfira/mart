"""Trace the two foreground colors of the supplied logo into SVG paths."""
from PIL import Image, ImageFilter
import numpy as np
from pathlib import Path
import sys

source, target = map(Path, sys.argv[1:])
image = Image.open(source).convert('RGB')
w, h = image.size
scale = 4
pixels = np.asarray(image.resize((w*scale, h*scale), Image.Resampling.LANCZOS)).astype(float)
r, g, b = pixels[:,:,0], pixels[:,:,1], pixels[:,:,2]
masks = [(r > g*1.35) & (r > b*1.35) & (g < 155), (r < 125) & (g < 130) & (b < 125) & (r < g*1.35)]

def simplify(points, tolerance=.7):
    if len(points) < 3:
        return points
    a, z = np.array(points[0]), np.array(points[-1])
    v = z-a
    coords = np.array(points)
    if np.dot(v,v):
        distances = np.abs(v[0]*(coords[:,1]-a[1])-v[1]*(coords[:,0]-a[0]))/np.linalg.norm(v)
    else:
        distances = np.linalg.norm(coords-a, axis=1)
    i = int(np.argmax(distances))
    if distances[i] <= tolerance:
        return [points[0],points[-1]]
    return simplify(points[:i+1],tolerance)[:-1]+simplify(points[i:],tolerance)

def trace(mask):
    edges = {}
    def edge(a,b): edges.setdefault(a,[]).append(b)
    height,width = mask.shape
    for y,x in zip(*np.nonzero(mask)):
        if y==0 or not mask[y-1,x]: edge((x,y),(x+1,y))
        if x==width-1 or not mask[y,x+1]: edge((x+1,y),(x+1,y+1))
        if y==height-1 or not mask[y+1,x]: edge((x+1,y+1),(x,y+1))
        if x==0 or not mask[y,x-1]: edge((x,y+1),(x,y))
    paths=[]
    while edges:
        start=next(iter(edges)); p=start; points=[p]
        while True:
            q=edges[p].pop()
            if not edges[p]: del edges[p]
            points.append(q);p=q
            if p==start: break
        area=abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(points,points[1:])))/2
        if area<4: continue
        mid=len(points)//2
        points=simplify(points[:mid+1])+simplify(points[mid:])[1:]
        paths.append('M'+' L'.join(f'{x/scale:g},{y/scale:g}' for x,y in points)+' Z')
    return ' '.join(paths)

svg=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title"><title id="title">MART Gallery</title>']
for mask,color in zip(masks,['#a44028','#14231c']):
    svg.append(f'<path fill="{color}" fill-rule="evenodd" d="{trace(mask)}"/>')
svg.append('</svg>')
target.write_text('\n'.join(svg),encoding='utf-8')
print(f'Traced {w}x{h} reference into {target}; no embedded bitmap or font dependency.')
