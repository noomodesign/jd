const IELayout = () => {
  const preloader = document.querySelector('[data-component="preloader"]');
  const MESSAGE = `Your browser is not supported. <br><br> Please use the latest version of Chrome, Safari or Firefox for the best experience on this site.`;
  const page = document.body;
  const parent = document.createElement('div');
  const parentClass = 'absolute w-full h-full z-50 text-xl lg:text-3xl flex items-center justify-center flex-col text-center p-60 bg-black text-white';
  const textNode = document.createElement('div');

  textNode.setAttribute('class', 'w-full max-w-screen-lg mx-auto');
  parent.setAttribute('class', parentClass);
  textNode.innerHTML = MESSAGE;

  preloader && preloader.remove();
  page.innerHTML = '';

  parent.appendChild(textNode);
  page.appendChild(parent);
};

export { IELayout as default };
