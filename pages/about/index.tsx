import Link from 'next/link'

const AboutPage = () => (
  < >
    <h2>About</h2>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </>
)

export default AboutPage
