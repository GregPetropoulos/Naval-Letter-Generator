import React, { Fragment } from 'react'

const Footer = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <Fragment>
  
<footer className="footer footer-center rounded-lg p-4 bg-base-300 text-base-content text-xs md:text-lg">
  <div>
    <p>Copyright © 2021-{currentYear} - All right reserved by Marine Coders</p>
  </div>
</footer>
    </Fragment>
  )
}

export default Footer