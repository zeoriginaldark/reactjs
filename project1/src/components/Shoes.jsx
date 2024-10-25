const Shoes = () =>{
    return(
        <main className="shoes container">
            <div className="shoes-content">
                <h1>YOUR FEET DESERVE THE BEST</h1>
                <p>YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.</p>

                <div className="shoes-btn">
                    <button>Shop Now</button>
                    <button className="category-btn">Category</button>
                </div>

                <div className="shopping">
                    <p>Also Available On</p>
                    <div className="brand-icons">
                        <img src="/images/flipkart.png" alt="flipkart-logo" />
                        <img src="/images/amazon.png" alt="amazon-logo" />
                    </div>
                </div>
            </div>
            <div className="shoes-image">
                <img src="/images/shoe_image.png" alt="shoe-img" />
            </div>
        </main>
    );
};

export default Shoes;