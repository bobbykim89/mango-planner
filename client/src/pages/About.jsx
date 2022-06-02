import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import about from '@/assets/imgs/about.jpg'

const About = () => {
  return (
    <Fragment>
      <Helmet>
        <title>About: Mango Planner</title>
        <meta
          name='description'
          content='This about page. Please check my Github page, Portfolio and Linkedin'
        />
      </Helmet>
      <section className='bg-yellow-100 py-20 text-gray-500 font-semibold min-h-90v lg:min-h-85v dark:bg-gray-600 dark:text-white'>
        <div className='lg:w-2/3 mx-auto px-4'>
          <div className='inline-block items-center grid grid-flow-row lg:grid-cols-2'>
            {/* Left */}
            <div className='inline-block py-20 justify-center'>
              <img
                src={about}
                alt='bird on monitor'
                className='w-2/3 mx-auto rounded-full border-4 border-white shadow-lg'
              />
            </div>
            <div className='flex flex-col inline-block px-2 mx-auto'>
              <h2 className='text-2xl md:text-3xl tracking-wider text-center'>
                About Mango Planner
              </h2>
              <div className='mb-4 text-md'>
                <p>Planner webapp in mango color theme</p>
                <p>Version: 0.1.4</p>
                <p>Made by: Bobby Kim</p>
              </div>
              <ul className='text-6xl flex flex-wrap justify-center'>
                <li className='mx-2 hover:text-red-500 dark:hover:text-yellow-400 transition ease-in duration-150'>
                  <a
                    href='https://github.com/bobbykim89'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fab fa-github-square' />
                  </a>
                </li>
                <li className='mx-2 hover:text-red-500 dark:hover:text-yellow-400 transition ease-in duration-150'>
                  <a
                    href='https://www.linkedin.com/in/bobby-kim-9baa17165/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fab fa-linkedin' />
                  </a>
                </li>
                <li className='mx-2 hover:text-red-500 dark:hover:text-yellow-400 transition ease-in duration-150'>
                  <a
                    href='mailto:bobby.sihun.kim@gmail.com'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fas fa-envelope' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default About
