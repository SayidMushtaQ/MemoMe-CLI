
import {Link} from 'react-router-dom'
import '../styles/Home.css'


export default function Home() {
    return (
        <>

            <div className="container-fuit nav">
                <div className="container-fluid row">
                    <div className="col-12 col-xl-12 col-l-12 col-md-12 col-sm-12">
                        <h1>THE NOTES TAKER</h1>
                        <ul className="u">
                            {/* <li><Link to={'/'} id="user">User</Link></li>&nbsp;&nbsp; */}
                            <li className='use'><Link to={'/'} id="Signin">User</Link></li>&nbsp;&nbsp;
                            <li className="icon"><i className="fa-solid fa-circle-user"></i></li>
                        </ul>
                    </div>
                </div>

                <div className="h2">
                    <h1>TAKE YOUR NOTES</h1>
                </div>

                <div className="container add">
                    <form action='#' method='get'>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" className="leb">Add a Title</label>
                            <input type="text" className="form-control" name="exampleFormControlInput1"
                                id="exampleFormControlInput1" placeholder="Add title" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1" className="leb">Add a Note</label>
                            <textarea className="form-control" name="exampleFormControlTextarea1" id="exampleFormControlTextarea1"
                                rows="3" placeholder="Write something"></textarea>
                        </div>
                        <button className="btn btn-success">Add Note</button>
                    </form>

                </div>

                <div className="container all">
                    <h2>All Your Notes</h2>
                </div>
                <div></div>

            </div >

            <section className="all-notes">
                <div className="notes-grid">
                    <div className="note-card red">
                        <h3>RAJDEEP</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo recusandae aut in beatae sequi esse ducimus illum maiores veniam, aliquam odio dignissimos deserunt perferendis ab assumenda suscipit dicta dolore placeat.</p>
                        <span className="timestamp">09:38 | 16 JULY 2024</span>
                    </div>
                    <div className="note-card yellow">
                        <h3>RAJDEEP</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum reprehenderit expedita eveniet nisi minima provident hic architecto magnam sunt est, temporibus velit ut exercitationem dicta voluptatibus, blanditiis reiciendis pariatur culpa?</p>
                        <span className="timestamp">09:38 | 16 JULY 2024</span>
                    </div>
                    <div className="note-card blue">
                        <h3>RAJDEEP</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur est ab eveniet. Voluptas consequuntur aperiam suscipit qui, nemo beatae voluptatibus veniam nesciunt natus eligendi iure magni expedita, neque sapiente velit?</p>
                        <span className="timestamp">09:38 | 16 JULY 2024</span>
                    </div>

                </div>
            </section>
            <section className="all-notes2">
                <div className="notes-grid">
                    <div className="note-card red">
                        <h3>RAJDEEP</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo recusandae aut in beatae sequi esse ducimus illum maiores veniam, aliquam odio dignissimos deserunt perferendis ab assumenda suscipit dicta dolore placeat.</p>
                        <span className="timestamp">09:38 | 16 JULY 2024</span>
                    </div>
                    <div className="note-card yellow">
                        <h3>RAJDEEP</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum reprehenderit expedita eveniet nisi minima provident hic architecto magnam sunt est, temporibus velit ut exercitationem dicta voluptatibus, blanditiis reiciendis pariatur culpa?</p>
                        <span className="timestamp">09:38 | 16 JULY 2024</span>
                    </div>
                    <div className="note-card blue">
                        <h3>RAJDEEP</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur est ab eveniet. Voluptas consequuntur aperiam suscipit qui, nemo beatae voluptatibus veniam nesciunt natus eligendi iure magni expedita, neque sapiente velit?</p>
                        <span className="timestamp">09:38 | 16 JULY 2024</span>
                    </div>

                </div>
            </section>


        </>
    )
}
