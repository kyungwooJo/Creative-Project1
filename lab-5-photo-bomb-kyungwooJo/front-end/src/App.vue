<template>
<div>
  <div id="app">
    <header id="header">
      <h1>Photo Bomb</h1>
      <nav>
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/dashboard"><i class="fas fa-user"></i></router-link>
      </nav>
    </header>
    <router-view />
  </div>
  <section id = "footer">
      <div class = "footer container">
         <p>Photo Bomb</p>
         <a href = "https://github.com/kyungwooJo/CreativeProject3">My gitHub page link</a>
      </div>
  </section>   
</div>  
</template>

<style>
/* Color scheme: https://paletton.com/#uid=7040u0knHs+edG7jrvYscpiuCk2 */
/* red: #e74c3c
 * blue: #277E8E
 */
body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
}

#header {
  /* Semi-circle */
  margin: 0 1em 1em 0;
  height: 100px;
  width: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #e74c3c;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: flex;
  justify-content: center;
}

h1 {
  color: #fff;
  font-size: 18px;
}

h2 {
  font-size: 12px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}

#footer .footer {
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    bottom:0;
    height: 10vh;
    left:0;
    right:0;
    color: white;
    font-size:20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#footer .footer a,
#footer .footer p{
    text-decoration: none;
    color: white;
    margin-top: 20px;
    padding:0;
    margin:10px;
   
}

#footer .footer a{
    color:turquoise;
}

</style>
