import { useEffect, useState } from 'react';
import '../../css/entry.css';
import axios from 'axios';
import Sq from '@/Components/Sq';
import rand from '@/Functions/rand';
import randColor from '@/Functions/randColor';
import { Head } from '@inertiajs/react';



export default function HelloEntry({number, entriesUrl}) {

    const [likes, setLikes] = useState(12);
    const [sq, setSq] = useState(null);

    useEffect(_ => {
        // console.log('Kreipiuosi į serverį adresu: ' + entriesUrl);
        axios.get(entriesUrl)
        .then(res => {
            const entriesFromServer = res.data.entries;
            setSq(entriesFromServer);
        })
        .catch(e => console.log(e))
    }, []);

      const addSq = (_) => {
        const number = rand(1000, 9999);
        const color = randColor();
        const id = rand(100000000, 999999999);
    
        setSq((s) => [...s, { number, color, id }]);
      };

    if (sq === null) {

        return (
            <div className='layout'>
                <h2 className='loading'><span>LOADING...</span></h2>
            </div>
        )
    }

    const addLike = () => {
    setLikes(likes + 1);
    };

    return (
        <div className='layout'>

            <Head title="Stories of Fundraises" />

            <h1>Platform for funding Ideas</h1>

            <table>
                <thead>

                    <tr>
                        <th>Stories / Ideas</th>
                        <th>Photos</th>
                        <th>Target Amount €</th>
                        <th>Amount Collected €</th>
                        <th>Remaining to Goal €</th>
                        <th>React ❤️</th>
                        <th>Donation History</th>
                        <th>Donate</th>
                        <th>#Tags</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        

                        <td className='stories-td'>
                        Ekologiškos fermos edukacinis centras.
                        Vieta kur vaikai galės susipažinti su gyvuliais ir ūkininkavimu.
                        </td>


                        <td className='gallery-container' style={{width: '150px'}}>

                            <img className="main" src="https://picsum.photos/200/120"/>

                            <div className="gallery">
                                <a href="galerija.html">
                                    <img src="https://picsum.photos/40?1"/>
                                    <img src="https://picsum.photos/40?2"/>
                                    <img src="https://picsum.photos/40?3"/>
                                    <img src="https://picsum.photos/40?4"/>
                                </a>
                            </div>

                        </td>


                        <td>10000,00</td>

                        <td>3500,00
                            <div className="progress">
                                <div className="progress-bar" style={{width: '35%'}}></div>
                            </div>
                        </td>

                        <td>6500,00</td>


                        <td>

                            <span className='likes-span'>{likes}</span>

                            <br/>

                            <button className="like-btn" onClick={addLike}>
                             +❤️
                            </button>

                        </td>


                        <td>

                            <ul>
                                <li>Jonas – 50,00 €</li>
                                <li>Ona – 20,00 €</li>
                                <li>Petras – 100,00 €</li>
                            </ul>

                        </td>


                        <td>

                            <input type="number" placeholder="... €" style={{textAlign: 'center'}}/>

                            <br/>

                            <button className="donate-btn">
                            Donate
                            </button>

                        </td>


                        <td className="tags">

                        #ūkis #edukacija #vaikai

                        </td>

                    </tr>
                </tbody>
            </table>





            {/* <h1>Hello Entry {number} </h1>
            <div className='kvadrato-konteineris'>
                {
                    sq.length === 0
                    ?
                    <h3>Kvadratukų nėra. Galite sukurti.</h3>
                    :
                    sq.map(s => <Sq key={s.id} sq={s}></Sq>)
                }

            </div>
            <div className='buttons'>
                <button className="green" onClick={addSq}>ADD SQ</button>
            </div> */}

            
        </div>
    )
}