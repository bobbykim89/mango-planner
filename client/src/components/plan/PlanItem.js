import React, { useContext, useEffect, useState } from 'react';
import { PlanContext } from '../../context/plan/PlanContext';

const PlanItem = ({ plan }) => {
  const planContext = useContext(PlanContext);
  const { deletePlan, updatePlan, setCurrent, clearCurrent, current } =
    planContext;
  const [currentPlan, setCurrentPlan] = useState({
    title: '',
    content: '',
    complete: false,
    type: 'personal',
  });

  useEffect(() => {
    if (current !== null) {
      setCurrentPlan(current);
    } else {
      setCurrentPlan({
        title: '',
        content: '',
        type: 'personal',
      });
    }
  }, [planContext, current]);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [details, setDetails] = useState(false);

  const { title, content, type } = currentPlan;

  const handleToggler = () => {
    setCurrent(plan);
    setToggleEdit(!toggleEdit);
  };

  const onChange = (e) => {
    setCurrentPlan({ ...currentPlan, [e.target.name]: e.target.value });
  };

  const toggleComplete = (e) => {
    setCurrent(plan);
    plan.complete = !plan.complete;
    updatePlan(plan);
    clearCurrent();
  };

  const bgHandler = () => {
    if (plan.type === 'personal') {
      return ' bg-yellow-50 dark:bg-gray-600';
    } else if (plan.type === 'work') {
      return ' bg-green-50 dark:bg-green-900';
    } else {
      return ' bg-indigo-50 dark:bg-indigo-900';
    }
  };

  const onCancelEdit = (e) => {
    setToggleEdit(!toggleEdit);
    clearCurrent();
  };

  const handleDelete = () => {
    deletePlan(plan.id);
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePlan(currentPlan);
    setCurrentPlan({
      title: '',
      content: '',
      complete: false,
      type: 'personal',
    });
    clearCurrent();
    setToggleEdit(!toggleEdit);
  };

  return (
    <section
      className={
        'rounded-md px-4 pt-4 md:px-8 md:px-8 shadow-lg mb-4' +
        bgHandler() +
        (plan.complete
          ? ' border-l-4 border-green-600 dark:border-green-300'
          : ' border-l-4 border-red-500 dark:border-red-400')
      }
    >
      <div className={'grid grid-cols-6' + (toggleEdit ? ' hidden' : ' block')}>
        <div className='col-span-5'>
          <div className='text-yellow-600 text-lg pb-2 mb-2 font-semibold text-left border-b-2 border-indigo-100 dark:text-white'>
            <span>{plan.title}</span>
          </div>
          <div
            className={
              'text-yellow-600 text-md text-left whitespace-pre-line dark:text-white' +
              (details ? '' : ' hidden')
            }
          >
            <span>{plan.content}</span>
          </div>
        </div>
        <div className='grid-flow-row text-yellow-600 text-md text-right dark:text-gray-300'>
          <span
            className={
              'material-icons cursor-pointer align-middle hover:text-yellow-400 dark:hover:text-white' +
              (plan.complete
                ? ' text-green-600 dark:text-green-300'
                : ' text-red-600 dark:text-red-400')
            }
            onClick={toggleComplete}
          >
            verified
          </span>
          <div className={'flex flex-col' + (details ? '' : ' hidden')}>
            <span
              className='material-icons cursor-pointer my-4 hover:text-yellow-400 dark:hover:text-white'
              onClick={handleToggler}
            >
              edit
            </span>
            <span
              className='material-icons cursor-pointer hover:text-yellow-400 dark:hover:text-white'
              onClick={handleDelete}
            >
              delete
            </span>
          </div>
        </div>
        <div
          className='col-span-6 cursor-pointer '
          onClick={() => setDetails(!details)}
        >
          <span className='material-icons text-yellow-600 hover:text-yellow-400 dark:text-gray-300 dark:hover:text-white '>
            {details ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </div>
      </div>

      <div className={toggleEdit ? 'block' : 'hidden'}>
        <form onSubmit={onSubmit} className='grid grid-cols-6 pb-4'>
          <div className='col-span-5'>
            <input
              type='text'
              placeholder='title'
              name='title'
              defaultValue={title}
              onChange={onChange}
              required
              className='block w-full outline-none mb-4 bg-transparent pb-2 border-b-2 border-indigo-100 text-yellow-600 dark:text-white'
            />
            <textarea
              name='content'
              rows='4'
              defaultValue={content}
              onChange={onChange}
              className='block w-full outline-none bg-transparent p-2 border-b-2 mb-4 border-indigo-100 text-yellow-600 dark:text-white'
            />
            <div className='text-md font-semibold'>
              <label
                htmlFor='personal'
                className='text-yellow-600 dark:text-gray-200'
              >
                Personal{' '}
              </label>
              <input
                type='radio'
                id='personal'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
                className='mr-6'
              />
              <label
                htmlFor='work'
                className='text-green-600 dark:text-green-200'
              >
                Work{' '}
              </label>
              <input
                type='radio'
                id='work'
                name='type'
                value='work'
                checked={type === 'work'}
                onChange={onChange}
                className='mr-6'
              />
              <label
                htmlFor='errand'
                className='text-indigo-600 dark:text-indigo-300'
              >
                Errand{' '}
              </label>
              <input
                type='radio'
                id='errand'
                name='type'
                value='errand'
                checked={type === 'errand'}
                onChange={onChange}
                className='mr-6'
              />
            </div>
          </div>
          <div className='flex flex-col text-yellow-600 text-md text-right dark:text-gray-300'>
            <button className='inline-block cursor-pointer mb-4 text-right hover:text-yellow-400 dark:hover:text-white'>
              <span className='material-icons'>done</span>
            </button>
            <span
              className='material-icons cursor-pointer hover:text-yellow-400 dark:hover:text-white'
              onClick={onCancelEdit}
            >
              close
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlanItem;
