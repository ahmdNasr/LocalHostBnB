const stayDefaultPicture =
  "https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/19a492ca-0e15-4b4b-9711-6000b657c094.jpeg?im_w=1440";
const Stay = ({ stay }) => {
  return (
    <div className="stay-grid-item">
      <img
        src={stay.pictures[0] || stayDefaultPicture}
        alt={`${stay.title} main`}
      />
      <div>
        <h3>{stay.title}</h3>
        <p>EUR {stay.price},-</p>
      </div>
    </div>
  );
};

export default Stay;
