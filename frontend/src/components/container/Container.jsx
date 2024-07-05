import './Styles.css';
import Interests from '../interests/Interests'
import Contact from '../contact/Contact'
import About from '../about/About'

const Container = () => {
  return (
    <div className="App">
      <main className="main-wrapper">
        <div className="card-content">
          <h1>Acerca de mi</h1>
          <p><About/></p>
        </div>
        <div className="card-content">
          <h1>Intereses</h1>
          <p><Interests/></p>
        </div>
        <div className="card-content">
          <h1>Contacto</h1>
          <p><Contact/></p>
        </div>
      </main>
    </div>
  );
}

export default Container;