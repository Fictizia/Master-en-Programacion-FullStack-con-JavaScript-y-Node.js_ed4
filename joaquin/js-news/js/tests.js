const tests = (() => {
  return {
    render: element => {
      element.innerHTML = `
        <div>${JSON.stringify(router.getCurrentRoute())}</div>
        <p>You can watch application tests on browser console</p>
      `;
      console.group('Start tests')
        console.log('When user navigates to tests then app has registered the home route "/"');
        console.assert(router.getRoutes().hasOwnProperty('/'), 'Doesn\'t exit the home route');

        console.log('When user navigates to tests then app has registered more than 4 routes');
        console.assert(Object.getOwnPropertyNames(router.getRoutes()).length > 4, 'Doesn\'t exit more than 4 routes');

      console.groupEnd;
    }
  }
})();