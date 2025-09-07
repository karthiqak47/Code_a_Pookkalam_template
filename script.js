const petalCounts = { 
    layer1:40, 
    layer2:60, 
    layer3:80, 
    layer4:100, 
    layer5:120, 
    layer6:140 
};
const layerToFlower = { 
    layer1:'jasmine', 
    layer2:'marigold', 
    layer3:'rose', 
    layer4:'lotus', 
    layer5:'chethi', 
    layer6:'sankapushpam' 
};
let ringsVisible = true;
let emojiBorderOn = true;

function onSliderInput(layerId, value){
    const n = Math.max(4, Math.min(400, Math.round(Number(value))));
    petalCounts[layerId] = n;
    document.getElementById('val-' + layerId).textContent = n;
    renderLayer(layerId);
}

function createFlowerPetals(layerId, petalCount, flowerType){
    const layer = document.getElementById(layerId);
    if(!layer) return;
    const inner = layer.querySelector('.flower-layer-inner');
    inner.innerHTML = '';

    const size = layer.clientWidth || parseInt(getComputedStyle(layer).width) || 200;
    const baseRadius = (size / 2) - 20;

    for(let i=0; i<petalCount; i++){
        const petal = document.createElement('div');
        petal.className = 'petal ' + flowerType + '-petal';

        const center = document.createElement('div');
        center.className = 'flower-center';
        petal.appendChild(center);

        const jitter = (Math.random()-0.5)*6;
        const angle = i*(360/petalCount) + jitter;
        const rad = angle * Math.PI / 180;
        const radialJitter = (Math.random()-0.5)*14;
        const petalRadius = baseRadius + radialJitter;
        const x = Math.cos(rad)*petalRadius;
        const y = Math.sin(rad)*petalRadius;

        petal.style.position = 'absolute';
        petal.style.left = '50%';
        petal.style.top = '50%';
        petal.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px) rotate(${angle+90}deg)`;
        petal.style.zIndex = 50 + Number(layerId.replace('layer',''));
        inner.appendChild(petal);
    }

    if(emojiBorderOn) createEmojiBorderForLayer(layerId, petalCount);
    else removeEmojiBorderForLayer(layerId);
}

function renderLayer(layerId){
    const flowerType = layerToFlower[layerId];
    createFlowerPetals(layerId, petalCounts[layerId], flowerType);
}

function renderAllLayers(){
    Object.keys(petalCounts).forEach(k => renderLayer(k));
    createScatteredFlowers();
    populateCenterThumba(12);
}

function createScatteredFlowers(){
    document.querySelectorAll('.scattered-flower').forEach(el=>el.remove());
    const container = document.getElementById('pookalam');
    const flowerTypes = ['jasmine','marigold','thumba'];
    for(let i=0;i<14;i++){
        const el = document.createElement('div');
        const ft = flowerTypes[Math.floor(Math.random()*flowerTypes.length)];
        el.className = 'scattered-flower ' + ft + '-petal';
        const angle = Math.random()*360;
        const rad = angle*Math.PI/180;
        const radius=220+Math.random()*160;
        const x=Math.cos(rad)*radius;
        const y=Math.sin(rad)*radius;
        el.style.left='50%';
        el.style.top='50%';
        el.style.position='absolute';
        el.style.transform=`translate(-50%,-50%) translate(${x}px, ${y}px) rotate(${angle}deg)`;
        el.style.zIndex=20;
        el.style.opacity=0.96;
        container.appendChild(el);
    }
}

function populateCenterThumba(count=12){
    const center = document.getElementById('centerThumba');
    Array.from(center.querySelectorAll('.thumba-instance')).forEach(e=>e.remove());
    for(let i=0;i<count;i++){
        const p = document.createElement('div');
        p.className='thumba-petal thumba-instance';
        const angle = (i*360)/count;
        const rad = angle*Math.PI/180;
        const radius = 20 + Math.random() * 10;
        const x = Math.cos(rad)*radius;
        const y = Math.sin(rad)*radius;
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.position = 'absolute';
        p.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px) rotate(${angle}deg)`;
        p.style.opacity = 0.8 + Math.random()*0.2;
        center.appendChild(p);
    }
}

// Placeholder functions (implement if needed)
function createEmojiBorderForLayer(layerId, petalCount){
    // Implementation here if required
}
function removeEmojiBorderForLayer(layerId){
    // Implementation here if required
}

// Initialize rendering on page load
window.onload = () => {
    renderAllLayers();
};
