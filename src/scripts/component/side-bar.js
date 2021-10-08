class SideBarr extends HTMLElement{
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML = `
        <aside>
            <div class="card">
                <div class="card-body">
                    <div class="container">
                        <div class="row p-1" id="Beranda">
                            <div class="col-2"><h4><i class="bi bi-house-door-fill"></i></h4></div>
                            <div class="col-9">
                                <h4 class="pt-1">Home</h4>
                            </div>
                        </div>
                        <div class="row p-1" id="History">
                            <div class="col-2"><h4><i class="bi bi-clock-history"></i></h4></div>
                            <div class="col-9">
                                <h4 class="pt-1">History</h4>
                            </div>
                        </div>
                        <div class="row p-1" id="Favorite">
                            <div class="col-2"><h4><i class="bi bi-star-fill"></i></h4></div>
                            <div class="col-9">
                                <h4 class="pt-1">Favorite</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>`
        }
}

customElements.define("side-bar", SideBarr);