"use strict";
const { parse } = require('@babel/parser');
const { walk } = require('estree-walker');
const MagicString = require('magic-string');
const path = require('path');

// List of Three.js elements to tag
const threeElems = [
    "object3D",
    "audioListener",
    "positionalAudio",
    "mesh",
    "batchedMesh",
    "instancedMesh",
    "scene",
    "sprite",
    "lOD",
    "skinnedMesh",
    "skeleton",
    "bone",
    "lineSegments",
    "lineLoop",
    "points",
    "group",
    "camera",
    "perspectiveCamera",
    "orthographicCamera",
    "cubeCamera",
    "arrayCamera",
    "instancedBufferGeometry",
    "bufferGeometry",
    "boxBufferGeometry",
    "circleBufferGeometry",
    "coneBufferGeometry",
    "cylinderBufferGeometry",
    "dodecahedronBufferGeometry",
    "extrudeBufferGeometry",
    "icosahedronBufferGeometry",
    "latheBufferGeometry",
    "octahedronBufferGeometry",
    "planeBufferGeometry",
    "polyhedronBufferGeometry",
    "ringBufferGeometry",
    "shapeBufferGeometry",
    "sphereBufferGeometry",
    "tetrahedronBufferGeometry",
    "torusBufferGeometry",
    "torusKnotBufferGeometry",
    "tubeBufferGeometry",
    "wireframeGeometry",
    "tetrahedronGeometry",
    "octahedronGeometry",
    "icosahedronGeometry",
    "dodecahedronGeometry",
    "polyhedronGeometry",
    "tubeGeometry",
    "torusKnotGeometry",
    "torusGeometry",
    "sphereGeometry",
    "ringGeometry",
    "planeGeometry",
    "latheGeometry",
    "shapeGeometry",
    "extrudeGeometry",
    "edgesGeometry",
    "coneGeometry",
    "cylinderGeometry",
    "circleGeometry",
    "boxGeometry",
    "capsuleGeometry",
    "material",
    "shadowMaterial",
    "spriteMaterial",
    "rawShaderMaterial",
    "shaderMaterial",
    "pointsMaterial",
    "meshPhysicalMaterial",
    "meshStandardMaterial",
    "meshPhongMaterial",
    "meshToonMaterial",
    "meshNormalMaterial",
    "meshLambertMaterial",
    "meshDepthMaterial",
    "meshDistanceMaterial",
    "meshBasicMaterial",
    "meshMatcapMaterial",
    "lineDashedMaterial",
    "lineBasicMaterial",
    "primitive",
    "light",
    "spotLightShadow",
    "spotLight",
    "pointLight",
    "rectAreaLight",
    "hemisphereLight",
    "directionalLightShadow",
    "directionalLight",
    "ambientLight",
    "lightShadow",
    "ambientLightProbe",
    "hemisphereLightProbe",
    "lightProbe",
    "spotLightHelper",
    "skeletonHelper",
    "pointLightHelper",
    "hemisphereLightHelper",
    "gridHelper",
    "polarGridHelper",
    "directionalLightHelper",
    "cameraHelper",
    "boxHelper",
    "box3Helper",
    "planeHelper",
    "arrowHelper",
    "axesHelper",
    "texture",
    "videoTexture",
    "dataTexture",
    "dataTexture3D",
    "compressedTexture",
    "cubeTexture",
    "canvasTexture",
    "depthTexture",
    "raycaster",
    "vector2",
    "vector3",
    "vector4",
    "euler",
    "matrix3",
    "matrix4",
    "quaternion",
    "bufferAttribute",
    "float16BufferAttribute",
    "float32BufferAttribute",
    "float64BufferAttribute",
    "int8BufferAttribute",
    "int16BufferAttribute",
    "int32BufferAttribute",
    "uint8BufferAttribute",
    "uint16BufferAttribute",
    "uint32BufferAttribute",
    "instancedBufferAttribute",
    "color",
    "fog",
    "fogExp2",
    "shape",
    "colorShiftMaterial"
];

const dreiElems = [
    "AsciiRenderer",
    "Billboard",
    "Clone",
    "ComputedAttribute",    
    "Decal",
    "Edges",
    "Effects",
    "GradientTexture",
    "MarchingCubes",
    "Outlines",
    "PositionalAudio",
    "Sampler",
    "ScreenSizer",
    "ScreenSpace",
    "Splat",
    "Svg",
    "Text",
    "Text3D",
    "Trail",
    "CubeCamera",
    "OrthographicCamera",
    "PerspectiveCamera",
    "CameraControls",
    "FaceControls",
    "KeyboardControls",
    "MotionPathControls",
    "PresentationControls",
    "ScrollControls",
    "DragControls",
    "GizmoHelper",
    "Grid",
    "Helper",
    "PivotControls",
    "TransformControls",
    "CubeTexture",
    "Fbx",
    "Gltf",
    "Ktx2",
    "Loader",
    "Progress",
    "ScreenVideoTexture",
    "Texture",
    "TrailTexture",
    "VideoTexture",
    "WebcamVideoTexture",
    "CycleRaycast",
    "DetectGPU",
    "Example",
    "FaceLandmarker",
    "Fbo",
    "Html",
    "Select",
    "SpriteAnimator",
    "StatsGl",
    "Stats",
    "Trail",
    "Wireframe",
    "CurveModifier",
    "AdaptiveDpr",
    "AdaptiveEvents",
    "BakeShadows",
    "Center",
    "ContactShadows",
    "Detailed",
    "Environment",
    "Float",
    "GradientTexture",
    "Hud",
    "Mask",
    "Mask2",
    "Mask3",
    "MeshDiscardMaterial",
    "MeshDistortMaterial",
    "MeshReflectorMaterial",
    "MeshRefractionMaterial",
    "MeshTransmissionMaterial",
    "MeshWobbleMaterial",
    "Outlines",
    "PerformanceMonitor",
    "Preload",
    "RenderCubeTexture",
    "RenderTexture",
    "Sampler",
    "Segments",
    "Shadow",
    "Shadows",
    "SoftShadows",
    "SpotLight",
    "Stage",
    "Stars",
    "Svg",
    "useCubeCamera",
    "useAnimations",
    "useAspect",
    "useCamera",
    "useContextBridge",
    "useCursor",
    "useDetectGPU",
    "useEnvironment",
    "useGLTF",
    "useGraph",
    "useHelper",
    "useIntersect",
    "useKTX2",
    "useMatcapTexture",
    "useMask",
    "useMaskTexture",
    "useNormalTexture",
    "useProgress",
    "useScroll",
    "useTexture",
    "useTrail",
    "useVideoTexture",
    "useWebcamTexture",
    "useDepthBuffer",
    "useInstancedMesh",
    "useInstancedMeshes",
    "usePointLight",
    "useSpotLight",
    "useDirectionalLight",
    "useAmbientLight",
    "useHemisphereLight",
    "useRectAreaLight",
    "useBoxProjectedEnv",
    "useGLTFLoader",
    "useFBXLoader",
    "useOBJLoader",
    "useMeshPhysicalMaterial",
    "useMeshStandardMaterial",
    "useMeshPhongMaterial",
    "useMeshToonMaterial",
    "useMeshNormalMaterial",
    "useMeshLambertMaterial",
    "useMeshDepthMaterial",
    "useMeshDistanceMaterial",
    "useMeshBasicMaterial",
    "useMeshMatcapMaterial",
    "useLineDashedMaterial",
    "useLineBasicMaterial",
    "usePointsMaterial",
    "useShaderMaterial",
    "useRawShaderMaterial",
    "useSpriteMaterial",
    "useShadowMaterial",
    "useTexture2D",
    "useTexture3D",
    "useCompressedTexture",
    "useCubeTexture",
    "useCanvasTexture",
    "useDepthTexture",
    "useVideoTexture",
    "useDataTexture",
    "useDataTexture3D",
    "useRaycaster",
    "useVector2",
    "useVector3",
    "useVector4",
    "useEuler",
    "useMatrix3",
    "useMatrix4",
    "useQuaternion",
    "useBufferAttribute",
    "useFloat16BufferAttribute",
    "useFloat32BufferAttribute",
    "useFloat64BufferAttribute",
    "useInt8BufferAttribute",
    "useInt16BufferAttribute",
    "useInt32BufferAttribute",
    "useUint8BufferAttribute",
    "useUint16BufferAttribute",
    "useUint32BufferAttribute",
    "useInstancedBufferAttribute",
    "useColor",
    "useFog",
    "useFogExp2",
    "useShape",
    "useColorShiftMaterial"
];

// Helper functions
function shouldTag(name) {
    const lowerName = name.toLowerCase();
    return threeElems.some(elem => lowerName === elem.toLowerCase()) ||
           dreiElems.some(elem => lowerName === elem.toLowerCase());
}

function isNextImageAlias(aliases, name) {
    return aliases.has(name);
}

function findVariableDeclarations(ast) {
    const variables = new Map();
    walk(ast, {
        enter(node, parent) {
            if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier') {
                variables.set(node.id.name, {
                    node,
                    parent,
                    loc: node.loc
                });
            }
        }
    });
    return variables;
}

function findMapContext(node, variables) {
    // Check if we're inside a map function
    let current = node;
    while (current && current.type !== 'CallExpression') {
        current = current.parent;
    }
    
    if (!current || !current.callee || current.callee.type !== 'MemberExpression') {
        return null;
    }
    
    const callee = current.callee;
    if (callee.property.type !== 'Identifier' || callee.property.name !== 'map') {
        return null;
    }
    
    // Get the array name
    let arrayName = '';
    if (callee.object.type === 'Identifier') {
        arrayName = callee.object.name;
    }
    
    // Find the index variable if it exists
    let indexVarName = null;
    if (current.arguments.length > 0 && 
        current.arguments[0].type === 'ArrowFunctionExpression' && 
        current.arguments[0].params.length > 1) {
        indexVarName = current.arguments[0].params[1].name;
    }
    
    return { arrayName, indexVarName };
}

function getSemanticName(node, mapContext, imageAliases) {
    if (node.name.type !== 'JSXIdentifier' && node.name.type !== 'JSXMemberExpression') {
        return null;
    }
    
    let name = '';
    if (node.name.type === 'JSXIdentifier') {
        name = node.name.name;
    } else {
        // Handle member expressions like Foo.Bar
        let current = node.name;
        const parts = [];
        while (current) {
            if (current.type === 'JSXMemberExpression') {
                parts.unshift(current.property.name);
                current = current.object;
            } else if (current.type === 'JSXIdentifier') {
                parts.unshift(current.name);
                break;
            } else {
                break;
            }
        }
        name = parts.join('-');
    }
    
    // Add map context if available
    if (mapContext && mapContext.arrayName) {
        name = `${name}-${mapContext.arrayName}`;
    }
    
    return name;
}

// Main loader function
function processCode(src, map, resourcePath, done) {
    try {
        const rel = path.relative(process.cwd(), resourcePath);
        const ms = new MagicString(src);
        let mutated = false;
        
        // Skip non-JSX files
        if (!src.includes('JSX')) {
            return done(null, src, map);
        }
        
        // Parse the code
        const ast = parse(src, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
            locations: true
        });
        
        const variables = findVariableDeclarations(ast);
        // 1️⃣ Gather local identifiers that reference `next/image`.
        const imageAliases = new Set();
        walk(ast, {
            enter(node) {
                if (node.type === 'ImportDeclaration' &&
                    node.source.value === 'next/image') {
                    for (const spec of node.specifiers) {
                        imageAliases.add(spec.local.name);
                    }
                }
            },
        });
        
        // 2️⃣ Inject attributes with enhanced semantic context.
        walk(ast, {
            enter(node) {
                if (node.type !== 'JSXOpeningElement')
                    return;
                const mapContext = findMapContext(node, variables);
                const semanticName = getSemanticName(node, mapContext, imageAliases);
                if (!semanticName ||
                    ['Fragment', 'React.Fragment'].includes(semanticName) ||
                    (!isNextImageAlias(imageAliases, semanticName.split('-')[0]) &&
                        !shouldTag(semanticName)))
                    return;
                const { line, column } = node.loc.start;
                let orchidsId = `${rel}:${line}:${column}`;
                // Enhance the ID with context if we have map information
                if (mapContext) {
                    orchidsId += `@${mapContext.arrayName}`;
                }
                
                // 🔍 Append referenced variable locations for simple identifier references in props
                node.attributes?.forEach((attr) => {
                    if (attr.type === 'JSXAttribute' &&
                        attr.value?.type === 'JSXExpressionContainer' &&
                        attr.value.expression?.type === 'Identifier') {
                        const refName = attr.value.expression.name;
                        const varInfo = variables.get(refName);
                        if (varInfo) {
                            orchidsId += `@${refName}`;
                        }
                    }
                });
                
                // 📍 If inside a map context and we have an index variable, inject data-map-index
                if (mapContext?.indexVarName) {
                    ms.appendLeft(node.name.end, ` data-map-index={${mapContext.indexVarName}}`);
                }
                
                ms.appendLeft(node.name.end, ` data-orchids-id="${orchidsId}" data-orchids-name="${semanticName}"`);
                mutated = true;
            },
        });
        
        if (!mutated)
            return done(null, src, map);
        
        const out = ms.toString();
        const outMap = ms.generateMap({ hires: true });
        
        /* Turbopack expects the sourcemap as a JSON *string*. */
        done(null, out, JSON.stringify(outMap));
    }
    catch (err) {
        done(err);
    }
}

// Export the loader function to make it a valid webpack loader
module.exports = function(source, sourceMap) {
    const callback = this.async();
    processCode(source, sourceMap, this.resourcePath, callback);
};
