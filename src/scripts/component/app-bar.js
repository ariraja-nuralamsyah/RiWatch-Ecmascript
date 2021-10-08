class AppBarr extends HTMLElement{
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML = `
        <nav class="navbar navbar-dark bg-primary">
            <span class="navbar-brand mb-0 h1" style="font-size:35px">RiWatch</span>
        </nav>`
        }
}

customElements.define("app-bar", AppBarr);