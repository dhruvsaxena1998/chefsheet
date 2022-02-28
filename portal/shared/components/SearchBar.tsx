export default function SearchBar() {
    return <div className="form-control">
        <div className="input-group">
            <select className="select bg-base-200" defaultValue={"none"}>
                <option disabled value={"none"}>Pick category</option>
                <option>T-shirts</option>
                <option>Mugs</option>
            </select>
            <input type={"text"} placeholder={"Search here"} className={"input bg-base-300 w-full rounded-lg"}/>
            <button className="btn btn-wide bg-base-200 tracking-wider">Search</button>
        </div>
    </div>
}