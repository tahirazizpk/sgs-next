import React from 'react';
import Details from './details';

const ProductDetail = () => {
    return (
        <>
            <section className="product-heading-section">
                <h1 className='product-heading'>Personalize Your Jerseys</h1>
            </section>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Qty</th>
                            <th>1+</th>
                            <th>5+</th>
                            <th>10+</th>
                            <th>20+</th>
                            <th>50+</th>
                            <th>100+</th>
                            <th>250+</th>
                            <th>500+</th>
                            <th>1000+</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Price</td>
                            <td>$23.99</td>
                            <td>$23.89</td>
                            <td>$23.79</td>
                            <td>$23.69</td>
                            <td>$22.99</td>
                            <td>$22.49</td>
                            <td>$21.99</td>
                            <td>$21.49</td>
                            <td>$19.99</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Details />
        </>
    )
}

export default ProductDetail