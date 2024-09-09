const contextBasedResources = {
  'intro-sequence': {
    name: 'introSequence',
    type: 'worker',
    length: 294,
    pad: 5,
    prefix: '',
    ext: '.jpg',
    path: `/assets/images/sequence/`,
  },
};

const globalResources = [
  // {
  //   name: 'environmentMaptexture',
  //   type: 'cubeTexture',
  //   path: [
  //     '/assets/static/textures/environmentMap/px.jpg',
  //     '/assets/static/textures/environmentMap/nx.jpg',
  //     '/assets/static/textures/environmentMap/py.jpg',
  //     '/assets/static/textures/environmentMap/ny.jpg',
  //     '/assets/static/textures/environmentMap/pz.jpg',
  //     '/assets/static/textures/environmentMap/nz.jpg',
  //   ],
  // },
  // {
  //   name: 'grassColorTexture',
  //   type: 'texture',
  //   path: '/assets/static/textures/dirt/color.jpg',
  // },
  // {
  //   name: 'grassNormalTexture',
  //   type: 'texture',
  //   path: '/assets/static/textures/dirt/normal.jpg',
  // },
  // {
  //   name: 'fox',
  //   type: 'gtlfModel',
  //   path: '/assets/static/models/Fox/glTF/Fox.gltf',
  // },
  // {
  //   name: 'sphere',
  //   type: 'texture',
  //   path: '/assets/static/textures/ball/color.jpg',
  // },
];

export const sources = {
  contextBasedResources,
  globalResources,
};
