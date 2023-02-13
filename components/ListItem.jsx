import Image from 'next/image';

const ListItem = ({ pizzaData, stopNumber }) => {
  return (
    <div className='rounded-md bg-slate-300 p-1 m-2 w-[96%] max-w-[400px]'>
      <div className='flex flex-row'>
        <div className='flex flex-row'>
          <div className='flex flex-col justify-center mr-2'>
            {stopNumber + 1}
          </div>
          {/* <img
            src={pizzaData.image_url}
            // style={'width: 50px, height: 50px'}
            height={'50px'}
            width={'50px'}
            alt='pizza image'
          /> */}
          <Image
            className='rounded-md'
            src={pizzaData.image_url}
            height='50px'
            width='60px'
            alt='pizza image'
          ></Image>
        </div>

        <div className='flex flex-col w-full items-center text-sm'>
          <h2 className='text-base'>{pizzaData.name}</h2>
          <span>{pizzaData.location.address1}</span>
          <div className='flex flex-row text-xs w-full justify-around'>
            <div>Rating: {pizzaData.rating}</div>
            <div>Reviews: {pizzaData.review_count}</div>
            <div>Price: {pizzaData.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
