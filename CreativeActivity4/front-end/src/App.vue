<template>
  <html id="app">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body class="appbody">  
      <img id="mainLogo" src="../images/book-logo.png">
      <router-view />
    </body>
         <section id = "footer">
        <div class = "footer container">
          <p>My scripture</p>
          <a href = "https://github.com/kyungwooJo/CreativeProject3">My gitHub page link</a>
        </div>
      </section>   
  </html>
</template>

<style>
*{
  padding: 0;
  margin: 0;
}

#mainLogo{
    position:absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top:50px;
    width:120px;
}

#navbar {
    z-index: 5;
    width:100%;
}

.appbody{ 
  length:100%;
  min-height:calc(100vh - 10vh);
}


#navbar .current {
    background-color: #4C8FFB;
}

.navbar-unlist{
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    white-space: nowrap;
    list-style: none;
}

#navbar li{
    width:100%;
    text-align: center;
    font-size:32px;
    padding:5px 0 0 10px;
    transition: all .5s ease;
    border-bottom: 1px solid black;
    padding-bottom:10px;
    padding-right:10px;
}

#navbar li:hover {
    background-color: #4C8FFB;
}

#navbar .nav-list ul li a {
    color: black;
    text-decoration:none;
}

#totalListNum {
  text-align:center;
  font-size:20px;
}

.spanRed{
  color:red;
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


@media screen and (min-width:800px) {
  
    #navbar {
        display:flex;
        justify-content: space-between;
    }

    #navbar li{
      border-bottom:none;
      border-right:1px solid black;
    }

    .navbar-unlist {
        flex-direction:row;
        padding: 0px, 30px;   
    }

    .navbar-unlist li a{
      font-size:16px;
    }

}

    @media screen and (max-width:800px) {
      #mainLogo{
        display:none;
      }
    
    }

</style>
