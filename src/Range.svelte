<section>
  <span class="helper slow">slow</span>
  <span class="helper fast">fast</span>
  <input type="range" id="range-{label}" min="0.05" max="2" value="1" step="0.01" on:input="fire('input', { value: this.value })" />
  <p>{label}</p>
</section>

<style>
  section {
    width: 200px;
    display: inline-block;
    position: relative;
  }
  p {
    width: 200px;
    text-align: center;
    font-size: 0.8rem;
    color: hsla(213, 60%, 50%, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .helper {
    position: absolute;
    top: -3px;
    color: hsla(213, 0%, 50%, 0.8);
    font-size: 0.8rem;
  }

  .slow{ 
    left: 5px;
  }

  .fast {
    right: 5px;
  }

  input[type="range"] {
    -webkit-appearance: none;
    margin: 11px 0;
    width: 200px;
    background: none;
    border: none;
    border: none;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 200px;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    background: hsla(213, 60%, 50%, 0.8);
    border-radius: 30px;
    /* border: 0.2px solid #010101; */
  }
  input[type="range"]::-webkit-slider-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    /* border: 1px solid #000000; */
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: hsla(213, 60%, 50%, 0.8);
  }
  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: hsla(213, 60%, 50%, 0.8);
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-moz-range-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    /* border: 1px solid #000000; */
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: hsla(213, 60%, 50%, 0.8);
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
  }
  input[type="range"]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
  }
  input[type="range"]::-ms-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: hsla(213, 60%, 50%, 0.8);
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: hsla(213, 60%, 50%, 0.8);
  }
</style>