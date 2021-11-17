<script>
    import { link } from "svelte-routing";
    // core components
    let navbarOpen = false;
    function setNavbarOpen() {
      navbarOpen = !navbarOpen;
    }
    function DownloadFileCV() {
              var fileName="RuiMeloCV2021.pdf";
              //Set the File URL.
              var url = "assets/Files/" + fileName;
   
              //Create XMLHTTP Request.
              var req = new XMLHttpRequest();
              req.open("GET", url, true);
              req.responseType = "blob";
              req.onload = function () {
                  //Convert the Byte Data to BLOB object.
                  var blob = new Blob([req.response], { type: "application/octetstream" });
   
                  //Check the Browser type and download the File.
                  var isIE = false || !!document.documentMode;
                  if (isIE) {
                      window.navigator.msSaveBlob(blob, fileName);
                  } else {
                      var url = window.URL || window.webkitURL;
                      var link = url.createObjectURL(blob);
                      var a = document.createElement("a");
                      a.setAttribute("download", fileName);
                      a.setAttribute("href", link);
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                  }
              };
              req.send();
          };
  </script>
  
    <nav
      class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg bg-gray-200 shadow">
      <div
        class="container px-4 mx-auto flex flex-wrap items-center justify-between"
      >
        <div
          class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
        >
          <a
            use:link
            class="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            href="https://www.linkedin.com/in/rui--melo/"
          >
            Rui Melo
          </a>
          <button
            class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            on:click="{setNavbarOpen}"
          >
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <div
          class="lg:flex flex-grow items-center {navbarOpen ? 'block':'hidden'}"
          id="example-navbar-warning"
        >
          <ul class="flex flex-col lg:flex-row list-none mr-auto">
            <li class="flex items-center">
              <a
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                href="https://github.com/rufimelo99"
                target="_blank"
              >
                <i class="text-blueGray-400 fab fa-github text-lg leading-lg" />
                <span class="lg:hidden inline-block ml-2">Github</span>
              </a>
            </li>
          </ul>
          <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li class="flex items-center">
              <a
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                href=""
                target="_blank"
              >
                <!--<i class="fa fa-linkedin" aria-hidden="true"></i>-->
                <span class="lg:hidden inline-block ml-2">??</span>
                <span class="lg:hidden inline-block ml-2">Linkedin</span>
              </a>
            </li>
  
           
  
            <li class="flex items-center">
              <button
                on:click="{DownloadFileCV}"
                class="bg-red-400 text-white active:bg-red-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                type="button"
              >
                <i class="fas fa-arrow-alt-circle-down"></i> CV Download
              </button  >
            </li>
          </ul>
        </div>
      </div>
    </nav>