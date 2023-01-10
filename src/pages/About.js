import React from 'react';

function AuthorLink({ link, site, title }) {
  return (
    <div className="flex items-center justify-start">
      <span className="m-[2px] w-[4.5rem] flex-shrink-0 items-center justify-start rounded-r-full bg-50 p-[1px] px-2 text-left text-600 dark:bg-slate-800 dark:text-slate-300">
        {site}
      </span>
      <a
        href={link}
        target="blank"
        className="pl-2 text-500 underline hover:cursor-pointer hover:text-600 dark:text-slate-100"
      >
        {title}
      </a>
    </div>
  );
}

function About() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center font-mono text-600">
      <div className="m-auto">
        <h1 className="font-sans text-2xl font-bold text-900 dark:text-slate-100">
          JavaScript React Template with Webpack and TailwindCSS
        </h1>
        <div className="pt-4">
          <a
            target="_blank"
            rel="noreferrer"
            className="inline text-center font-sans text-xl text-800 underline dark:text-slate-100"
            href="https://github.com/nyinyithann/react-webpack-tailwind-template"
          >
            GitHub Repository
          </a>
        </div>
        <div className="pt-2 font-sans text-xl">
          <div className="mt-4 flex flex-col items-center justify-center border-t border-200 pt-2 font-sans text-[0.7em] font-normal dark:border-slate-500">
            <div className="relative mb-4 h-24 w-24">
              <img
                src="https://avatars.githubusercontent.com/u/156037"
                alt="mygithub"
                className="h-full w-full rounded-full border-4 border-300 saturate-150 sepia-0 dark:border-slate-500"
              />
              <span className="absolute right-1 -top-1 rounded-full border-2 border-300 bg-900 p-1 text-xs text-200 dark:border-slate-500 dark:bg-slate-600 dark:text-slate-300">
                By{' '}
              </span>
            </div>
            <div>
              <AuthorLink
                link="https://github.com/nyinyithann"
                title="@nyinyithann"
                site="GitHub"
              />
              <AuthorLink
                link="https://www.linkedin.com/in/nyinyithan/"
                title="@nyinyithann"
                site="LinkedIn"
              />
              <AuthorLink
                link="https://twitter.com/JazzTuyat"
                title="@JazzTuyat"
                site="Twitter"
              />
              <AuthorLink
                link="https://nyinyithan.com"
                title="https://nyinyithan.com"
                site="Blog"
              />
              <AuthorLink
                link="mailto:nyinyithann@gmail.com"
                title="nyinyithann@gmail.com"
                site="Email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
