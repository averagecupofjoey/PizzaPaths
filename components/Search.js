const Search = () => {
  const searchPaths = (event) => {
    event.preventDefault();
    // const res = await fetch() making our Yelp fetch here
    // const paths = res.json()
  };
  return (
    // <div>
    <form onSubmit={searchPaths}>
      <button>Get your exact location</button>
      <input type='text' placeholder='location'></input>
      <select name='slices' id='slices'>
        <option value=''>Slices Desired</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
      <select name='distance' id='distance'>
        <option value=''>Path Distance</option>
        <option value='100'>Under 10 blocks</option>
        <option value='300'>20 blocks</option>
        <option value='3600'>Under 1 mile</option>
      </select>
      <br />
      <button type='submit'>Find my path!</button>
    </form>
    // </div>
  );
};

export default Search;
