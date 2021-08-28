import React, { useContext, useState } from 'react';
import { PlanContext } from '../../context/plan/PlanContext';

const InputForm = () => {
  const planContext = useContext(PlanContext);
  const { addPlan } = planContext;

  const [plan, setPlan] = useState({
    title: '',
    content: '',
    complete: false,
    type: 'personal',
  });

  const { title, content, type } = plan;

  const onChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPlan(plan);
    setPlan({
      title: '',
      content: '',
      complete: false,
      type: 'personal',
    });
  };
  return (
    <section className='lg:sticky lg:top-24'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col rounded-md px-4 py-4 md:px-8 md:px-8 bg-yellow-50 shadow-lg'
      >
        <div className='mb-4 text-left'>
          <label
            htmlFor='title'
            className='text-yellow-600 text-lg font-semibold'
          >
            Title:
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onChange}
            required
            placeholder='Please write your plan here'
            className='outline-none block w-full p-2 border-2 shadow border-yellow-400 bg-yellow-50'
          />
        </div>
        <div className='mb-4 text-left'>
          <label
            htmlFor='content'
            className='text-yellow-600 text-lg font-semibold'
          >
            Details:
          </label>
          <textarea
            name='content'
            id='content'
            cols='30'
            rows='10'
            placeholder='Write details here'
            value={content}
            onChange={onChange}
            className='outline-none block w-full border-2 p-2 shadow border-yellow-400 bg-yellow-50'
          ></textarea>
        </div>
        <div className='mb-4 text-lg font-semibold'>
          <label htmlFor='personal_edit' className='text-yellow-600'>
            Personal{' '}
          </label>
          <input
            type='radio'
            id='personal_edit'
            name='type'
            value='personal'
            checked={type === 'personal'}
            onChange={onChange}
            className='mr-6'
          />
          <label htmlFor='work_edit' className='text-green-600'>
            Work{' '}
          </label>
          <input
            type='radio'
            id='work_edit'
            name='type'
            value='work'
            checked={type === 'work'}
            onChange={onChange}
            className='mr-6'
          />
          <label htmlFor='errand_edit' className='text-indigo-600'>
            Errand{' '}
          </label>
          <input
            type='radio'
            id='errand_edit'
            name='type'
            value='errand'
            checked={type === 'errand'}
            onChange={onChange}
            className='mr-6'
          />
        </div>
        <div>
          <input
            type='submit'
            value='Submit'
            className='block w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-lg text-white font-semibold tracking-wider shadow-lg'
          />
        </div>
      </form>
    </section>
  );
};

export default InputForm;
