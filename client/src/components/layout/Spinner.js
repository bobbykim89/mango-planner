import React, { Fragment } from 'react'
import spinner from 'assets/imgs/spinner.gif'

const Spinner = () => (
  <Fragment>
    <img src={spinner} alt='Loading...' className='w-20 mx-auto block my-20' />
  </Fragment>
)

export default Spinner
