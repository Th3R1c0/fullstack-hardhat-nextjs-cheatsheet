import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface sitelink {
  url: string;
  name: string;
}

const RenderPage = (props) => {
  console.log(props.data[0].name);
  const data = props.data[0];

  const Sitelink = ({ url, name }: sitelink) => {
    return (
      <div>
        {' '}
        {/*implement box with fading image in it */}
        <a className="text-2xl" href={`${url}`}>
          {name}{' '}
        </a>
      </div>
    );
  };

  const Content = () => {
    return (
      <div className="w-full h-max p-4">
        {data.links.map((l) => (
          <Sitelink key={l.url} url={l.url} name={l.name} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-4 h-screen flex flex-col p-4">
      <div className="w-full h-max pb-4 border-b-2 border-gray-300">
        <p className="font-bold text-5xl">Tailwind css</p>
        <p>
          docs:{' '}
          <a href="https://tailwindcss.com/docs/installation" className="">
            https://tailwindcss.com/docs/installation
          </a>
        </p>
      </div>

      <div className="flex w-full h-screen ">
        <div className=" flex flex-col space-y-4 w-max h-full p-4 border-r-2 border-gray-300">
          {data.sections.map((section) => (
            <div
              key={section}
              className="w-full cursor-pointer h-max rounded-md text-center bg-blue-500 p-2"
            >
              {section}
            </div>
          ))}
          <div className="w-full font-bold cursor-pointer flex nowrap h-max rounded-md text-center bg-blue-500 p-2">
            add section
          </div>
        </div>
        <Content />
      </div>
    </div>
  );
};

//if props or something you pass is not rendering, then try map() for props or objects rendered or passed

export default RenderPage;

export async function getServerSideProps(context) {
  const { params } = context;
  //params is a object contain
  const pagename = params.name;
  //params: If this page uses a dynamic route, params contains the route parameters. If the page name is [id].js , then params will look like { id: ... }.
  console.log(params);
  const data = [
    {
      name: 'tailwind',
      sections: ['svgs', 'components', 'animation'],
      links: [
        {
          name: 'heroicons',
          url: 'https://heroicons.com/',
        },
      ],
    },
    {
      name: 'next',
      sections: ['dynamic', 'pages', 'ssr', ' ssg', 'isr'],
      links: [
        {
          name: 'ssr resources',
          url: 'https://heroicons.com/',
        },
      ],
    },
  ];
  const filtereddata = data.filter((i) => i.name == params.name);

  return {
    props: {
      data: filtereddata,
    }, // will be passed to the page component as props
  };
}
