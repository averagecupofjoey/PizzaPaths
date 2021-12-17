import PizzaJoint from './PizzaJoint';
import articleStyles from '../styles/Article.module.css';

const PizzaPath = ({ pizzaData, numSlices }) => {
  let slices = numSlices;
  // const getNewPath = function (pizzaData, numSlices) {};
  // if({pizzaData}.{})
  console.log('In pizza path');
  console.log(slices);
  console.log('The initial pizza data', pizzaData);
  console.log('Attempting to map data', pizzaData[Number(slices)][0]);
  return (
    <div className={articleStyles.grid}>
      {pizzaData[slices][0][0].map((pizzaArray) => (
        // <h3>{`Walk $(slices)`}</h3>
        <PizzaJoint
          pizzaJoint={pizzaArray}
          key={pizzaArray.id}
          // travelDistance={pizzaArray[1]}
        />
      ))}
    </div>
  );
};

export default PizzaPath;
