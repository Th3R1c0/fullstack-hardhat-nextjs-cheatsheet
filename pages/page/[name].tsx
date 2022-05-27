import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, createContext, useContext, useEffect } from 'react';
import { app, db } from '../../firebase';
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  push,
  update,
} from 'firebase/database';

//firebase not working, need to find a example to clone :(

//current: database, either ssr fetch, or somewhere in the components is fucking up array of data, find and fix

//todo:
// create components for functions
// fix add link button
// implement callback function for updating text on buttons
// combine textblock,codeblock,sectionblock..ect into one function
//intergrate firebase for database
// find / get a new layout and look (latestage )

function fakedata() {
  const mock_data = [
    {
      id: 0,
      type: 'section',
      text: 'section1',
    },
    {
      id: 1,
      type: 'code',
      text: 'a code block 1',
    },
    {
      id: 2,
      type: 'link',
      text: 'this is a link breh',
    },
  ];
  const newPostKey = push(child(ref(db), 'tailwind')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/tailwind/' + newPostKey] = mock_data;
  updates['/next/' + newPostKey] = mock_data;

  return update(ref(db), updates);
}

//fakedata()

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
  id: number;
  type: 'code' | 'text' | 'section' | 'link';
  text: string;
  url?: string;
}

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

const CodeBlock = ({ text, updateblock }) => {
  const [t, setText] = useState(text);
  const [isEditing, toggleEdditing] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      toggleEdditing(!isEditing);
      updateblock(t);
    }
  };
  const box = (
    <div
      className="p-2 bg-black w-max text-white rounded-md text-left"
      onDoubleClick={() => toggleEdditing(!isEditing)}
    >
      <p>{t}</p>
    </div>
  );
  const editingbox = (
    <div className="p-2 bg-black w-max text-white rounded-md text-left">
      <input
        className="bg-inherit"
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
  const [content_boxes, setContent_boxed] = useState(data);
  console.log(data, 'data from contentbox');
  useEffect(() => {
    //fetch database
    const currentref = ref(db, `${data.name}`);
    onValue(currentref, (snapshot) => {
      //const data = snapshot.val();
      //console.log(data.tailwind.N33jrtIBCsB5vZvtaNj)
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // ...
        console.log(childData);
        setContent_boxed(childData);
      });
    });
  }, []);

  console.log(content_boxes[0].type, 'fetched content boxes, frontend');

  const updateblock = (text) => {
    console.log(text);
  };

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
              return <CodeBlock text={box.text} updateblock={updateblock} />;
            case 'text':
              return <TextBlock text={box.text} />;
            case 'section':
              return <SectionBlock text={box.text} />;
            case 'link':
              return <Sitelink key={box?.url} text={box.text} />;
            default:
              console.log(box.type);
              return;
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
  //const sections = data.filter(block => block.id )
  //console.log(sections, 'sections')
  const sections = ['fds'];
  console.log(data[2].type, 'data'); //need to filter data to just blocks with type section to render sections
  return (
    <>
      <div className=" flex flex-col space-y-4 h-full border-green-300 border-2">
        <div className="border-r-2 flex flex-col w-32 space-y-4 w-max h-full border-red-300 ">
          {sections.map((section) => (
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

const RenderPage = ({ data }) => {
  console.log(data);

  return (
    <div className="w-full space-y-4 h-screen flex flex-col p-4">
      <div className="w-full h-max pb-4 border-b-2 border-gray-300">
        <p className="font-bold text-5xl">Tailwind css</p>
        <p>
          docs:
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

  const fetcher = () => {
    //fetch database
    const currentref = ref(db, `${params.name}`);
    var a = [];
    onValue(currentref, (snapshot) => {
      //const data = snapshot.val();
      //console.log(data.tailwind.N33jrtIBCsB5vZvtaNj)
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // ...
        a.push(childData);
      });
    });
    return a;
  };
  const datatopass = fetcher();
  console.log(datatopass, 'backend caling here');

  return {
    props: {
      data: datatopass,
    }, // will be passed to the page component as props
  };
}
