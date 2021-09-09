export interface Feedback {
    id: string,
    text: string,
    date: string,
    author: string,
  }

export interface FeedBackListProps {
    feedsList: {
        id: string,
        text: string,
        date: string,
        author: string,
    }[]
    setFeeds: (data: object[]) => void
}