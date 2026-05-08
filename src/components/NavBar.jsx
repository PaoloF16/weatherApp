import { useState } from "react";
import { Container, Nav, Navbar, Form } from "react-bootstrap";

const popularCities = [
  "Madrid",
  "London",
  "Paris",
  "Rome",
  "New York",
  "Tokyo",
  "Barcelona",
  "Berlin",
  "Lisbon",
  "Buenos Aires",
];

function NavBar({ onCitySearch }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (search.trim() === "") return;

    onCitySearch(search);
    setSearch("");
  }
  const randomCities = [...popularCities]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <>
      <Navbar className="top-navbar" expand="lg">
        <Container>
          <Navbar.Brand className="logo">Metheo App</Navbar.Brand>

          <Form className="search-box" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="The Weather in..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">🔍</button>
          </Form>

          <div className="mini-weather d-none d-md-flex">
            {randomCities.map((city) => (
              <button
                key={city}
                className="mini-weather-card"
                onClick={() => onCitySearch(city)}
              >
                🌦️ {city}
              </button>
            ))}
          </div>
        </Container>
      </Navbar>

      <div className="menu-bar">
        <Container>
          <Nav className="gap-4">
            <Nav.Link>The Weather</Nav.Link>
            <Nav.Link>News</Nav.Link>
            <Nav.Link>Video</Nav.Link>
            <Nav.Link>Alerts</Nav.Link>
            <Nav.Link>Radar</Nav.Link>
            <Nav.Link>Maps</Nav.Link>
          </Nav>
        </Container>
      </div>
    </>
  );
}

export default NavBar;
