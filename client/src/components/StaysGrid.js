import Stay from './Stay';


const StaysGrid = ({ stays }) => {
    return (
        <main className="stays-container">
            {stays.map((stay) => (
                <Stay key={stay._id} stay={stay} />
            ))}
        </main>
    );
};

export default StaysGrid;