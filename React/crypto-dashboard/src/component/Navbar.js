import React from 'react'
import { CryptoState } from '../CryptoContext'
export default function Navbar() {
  
  const {currency,setCurrency} = CryptoState()
 console.log(currency)

  return (
    <nav className="navbar bg-body-tertiary dashboard pb-3">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="/">
      <i class="bi bi-inboxes-fill"></i> <span>Bootstrap</span>
    </a>
    <div className='d-flex align-items-center ms-auto gap-2 me-3'>
    <div className="dropdown ">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" value={currency} onChange={(e)=>{setCurrency(e.target.value)}}>
    Currency
  </button>
  <ul className="dropdown-menu">
    <li> <button className="dropdown-item" onClick={() => setCurrency("USD")}>USD</button></li>
    <li><button className="dropdown-item" onClick={() => setCurrency("INR")}>INR</button></li>
  </ul>
</div></div>
    <form className="d-flex justify-content-end ">
    <button className="btn btn-success me-2" type="button">Main button</button>
    <button className="btn btn-sm btn-secondary" type="button">Smaller button</button>
  </form>
   
  </div>
  
</nav>
  )
}
