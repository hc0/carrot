示例 Example ⬇️

```
<div>
{/*

// Get the current location.
const location = History.location

// Listen for changes to the current location.
const unlisten = History.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

// Use push, replace, and go to navigate around.
History.push('/home', { some: 'state' })

// To stop listening, call the function returned from listen().
unlisten()

*/}
</div>

```