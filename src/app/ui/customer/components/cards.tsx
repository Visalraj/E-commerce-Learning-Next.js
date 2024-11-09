import Icon from "../../common/svg-tiles"
export default function Card({ icon, title, description, }: { icon: string; title: string; description: string }) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: '380px' }}>

            <Icon name={icon} />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
            <a href="#" className=" no-underline inline-flex font-medium items-center  text-blue-600 ">
                Visit &nbsp;
                <Icon name={"Arrowright"} />
            </a>
        </div>

    )
}