const formatDate = (timestamp) => {
    if (!timestamp) return "_";
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleDateString();
  };
  
  export default formatDate;
  