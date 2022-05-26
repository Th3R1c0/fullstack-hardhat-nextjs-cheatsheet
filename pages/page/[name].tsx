import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, createContext, useContext } from 'react';
//move this to a seperate file
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

interface sitelink {
  url: string;
  name: string;
}

const Sections_content = () => {
  return <h1> only need it content gets big and complex </h1>;
};

const Sections_edit_bar = ({ AddBlock }: any) => {
  //usecontext
  //'code' | 'text' | 'section' | 'link',
  return (
    <div className="w-max fixed space-x-2 group bottom-10 flex items-center h-max">
      <div className=" border-2 border-gray-300 items-center flex justify-center p-2 rounded-[100px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      {['code', 'text', 'section', 'link'].map((btn) => (
        <button
          className="w-max h-max p-2 group-hover:block hidden rounded-lg bg-red-400"
          onClick={() => AddBlock({ btn })}
        >
          {`Add ${btn}`}
        </button>
      ))}
    </div>
  );
};

interface contentbox {
  type: 'code' | 'text' | 'section' | 'link';
  text: string;
  url?: string;
}
const mock_data = [
  {
    type: 'section',
    text: 'section1',
  },
  {
    type: 'code',
    text: 'a code block 1',
  },
  {
    type: 'link',
    text: 'this is a link breh',
  },
];

const TextBlock = ({ text }) => {
  return (
    <div className="">
      <p>{text}</p>
    </div>
  );
};

const SectionBlock = ({ text }) => {
  return (
    <div className="">
      <p>{text}</p>
    </div>
  );
};

//pass a function here through context or props to update text to database.

const CodeBlock = ({ text }) => {
  const [t, setText] = useState(text);
  const [isEditing, toggleEdditing] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      toggleEdditing(!isEditing);
    }
  };
  const box = (
    <div className="" onDoubleClick={() => toggleEdditing(!isEditing)}>
      <p>{t}</p>
    </div>
  );
  const editingbox = (
    <div>
      <input
        type="text"
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={(e) => setText(e.target.value)}
        value={t}
        placeholder={t}
      />
    </div>
  );
  return <>{isEditing ? editingbox : box}</>;
};

const ContentBox = () => {
  const data = useContext(DataContext);

  //called contentboxes because they are boxes like a todolist, that can be reordered and reorganized
  const [content_boxes, setContent_boxed] = useState(mock_data);

  const AddBlock = (type) => {
    setContent_boxed([
      ...content_boxes,
      {
        type: type.btn,
        text: `this is a ${type.btn} block`,
      },
    ]);
    console.log(type.btn);
  };
  return (
    <div className="flex p-4 flex-col w-full h-full border-green-300 border-2">
      {/*<div className="w-full h-max">
        {data.links.map((l) => (
          <Sitelink key={l.url} url={l.url} name={l.name} />
        ))}
        </div>*/}
      <div className="space-y-4">
        {content_boxes.map((box) => {
          //'code' | 'text' | 'section' | 'link',
          switch (box.type) {
            case 'code':
              return <CodeBlock text={box.text} />;
            case 'text':
              return <TextBlock text={box.text} />;
            case 'section':
              return <SectionBlock text={box.text} />;
            case 'link':
              return <Sitelink key={box?.url} text={box.text} />;
          }
        })}
      </div>

      <Sections_edit_bar AddBlock={AddBlock} />
    </div>
  );
};

//grouped into box for fade in animations later on
const PageContent = () => {
  return (
    <div className="flex w-full h-screen ">
      <SectionBox />
      <ContentBox />
    </div>
  );
};

const SectionBox = () => {
  const data = useContext(DataContext);
  return (
    <>
      <div className=" flex flex-col space-y-4 h-full border-green-300 border-2">
        <div className="border-r-2 flex flex-col w-32 space-y-4 w-max h-full border-red-300 ">
          {data.sections.map((section) => (
            <div
              key={section}
              className="w-full cursor-pointer h-max rounded-md text-center bg-blue-500 p-2"
            >
              <p>{section}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const DataContext = createContext('');

const RenderPage = (props) => {
  console.log(props.data[0].name);
  const data = props.data[0];

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
      {/*edit header*/}

      <DataContext.Provider value={data}>
        <PageContent />
      </DataContext.Provider>
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
