const eventListenerHandler = (() => {
  return {
    listenHashchange : navigate => {
      window.addEventListener('hashchange', e => {
        const to = (hash =>
          hash.indexOf('#') == 0 ? hash.substr(1) : hash
        )(window.location.hash);
        navigate(to);
      });
    },
    listenRouterLinks: (selector, navigate) => {
      document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('click', e => {
          const to = e.toElement.getAttribute('to');
          navigate(to);
        });
      });
    }
  }
})();
