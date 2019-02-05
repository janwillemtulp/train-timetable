<section>
  <input type="checkbox" id="checkbox-{label}" on:change="fire('switch')" {checked} />
  <label for="checkbox-{label}"></label>
  
  <p>{label}</p>
  <p>{label}</p>
</section>


<!-- <section>
  <input type="checkbox" id="checkbox2" checked />
  <label for="checkbox2"></label>
  
  <p>distortion</p>
  <p>distortion</p>
</section> -->

<!-- https://codepen.io/sergejmueller/pen/rJdaj -->

<style>
  /* * {
    margin: 0;
    padding: 0;
  }
  html {
    margin: 2em;
    background: #f0f0f0;
    text-align: center;
  } */

  section {
    width: 100px;
    display: inline-block;
  }
  input {
    display: block;
    opacity: 0;
  }
  label {
    width: 60px;
    height: 30px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    background: rgb(45, 44, 44);
    border-radius: 30px;
    
    transition: background-color 0.4s;
    -moz-transition: background-color 0.4s;
    -webkit-transition: background-color 0.4s;
  }
  label:after {
    left: 0;
    width: 20px;
    height: 20px;
    margin: 5px;
    content: '';
    position: absolute;
    background: #FFF;
    border-radius: 10px;
  }
  input:checked + label {
    background: hsla(213, 60%, 50%, 0.8);
  }
  input:checked + label:after {
    left: auto;
    right: 0;
  }

  p {
    font-size: 0.8rem;
    color: hsla(213, 0%, 50%, 0.8);
    display: none;
    text-transform: uppercase;
    letter-spacing: 1.3px;
  }
  input:checked ~ p:nth-of-type(1) {
    color: hsla(213, 60%, 50%, 0.8);
    display: block;
  }
  input:not(:checked) ~ p:nth-of-type(2) {
    display: block;
  }
</style>