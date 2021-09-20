import BlogPostPage from './BlogPostPage'

export const generated = () => {
  mockGraphQLQuery('BlogPostQuery', () => {
    return {
      post: {
        id: 1,
        title: 'Hello post',
        body: `Yesterday, we wrote about how startups are tackling employee onboarding challenges caused by a remote workforce. There’s another culprit at play here — the fact that we use so many apps. On average, small to large businesses implement 73-175 apps. As we mentioned, documentation is one solution to helping teams manage buried knowledge among all these tools. Another is search. A search tool for your work apps might feel like déjà vu if you read our newsletter on Qatalog. The “work hub” pulls together all your tools and has a master search function. This week we also met Glean. Glean calls itself a “work assistant.” The hero feature today is the ability to search across all of your work apps, and there are discovery and connection functions for team members, too. This part slightly resembles a social or LinkedIn profile, but Glean says the product reveals insights and helps you find people who can help with whatever it is you need at work. “Glean can search across the entire breadth of your company... It understands who you are, what you’re working on, and who you’re working with, to deliver highly personalized results,” CEO Arvind Jain wrote. The makers’ expertise is reflected across Glean. Jain himself founded Rubrik, a cloud data management company, after serving over a decade as an engineer at Google. He’s joined by several other ex-Googlers and Facebook engineers. Glean and Qatalog are after your holistic workspace, but we’ve seen several other tools launch this year to make information more accessible through search. Jadoo - Search and manage your mobile screenshots Findem - Search for the ideal job candidate with the exact attributes you need Bloop - In-IDE code search engine that retrieves JS and TypeScript code examples Vehicle Listings API - Programmatically search cars and trucks available for sale SaveCmd Terminal Search - Search command history from other clients from the command line Now we just need a product that searches our brains for names we just learned.`,
        createdAt: '2020-01-01T12:34:45Z',
        publishedAt: '2020-01-01T12:34:45Z',
        updatedAt: '2020-01-01T12:34:45Z',
      },
    }
  })
  return <BlogPostPage />
}

export default { title: 'Pages/BlogPostPage' }
