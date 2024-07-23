--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: constelation; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.constelation (
    constelation_id integer NOT NULL,
    name character varying(30) NOT NULL,
    star_id integer
);


ALTER TABLE public.constelation OWNER TO freecodecamp;

--
-- Name: constelation_constelation_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.constelation_constelation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.constelation_constelation_id_seq OWNER TO freecodecamp;

--
-- Name: constelation_constelation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.constelation_constelation_id_seq OWNED BY public.constelation.constelation_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    ly integer,
    visible boolean,
    diameter numeric(6,2),
    magnetic_field integer,
    class text
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    ly integer,
    visible boolean,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    ly integer,
    visible boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    ly integer,
    visible boolean,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: constelation constelation_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constelation ALTER COLUMN constelation_id SET DEFAULT nextval('public.constelation_constelation_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: constelation; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.constelation VALUES (3, 'aquario', 15);
INSERT INTO public.constelation VALUES (4, 'aquario b', 16);
INSERT INTO public.constelation VALUES (5, 'aquario a', 17);
INSERT INTO public.constelation VALUES (6, 'virgo', 18);
INSERT INTO public.constelation VALUES (7, 'virgo b', 19);
INSERT INTO public.constelation VALUES (8, 'scorpio', 20);
INSERT INTO public.constelation VALUES (9, 'scorpio b', 21);
INSERT INTO public.constelation VALUES (10, 'sagitario', 22);
INSERT INTO public.constelation VALUES (11, 'sagitario a', 23);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'a', 100, true, 30.00, 12, 'MilkyWay');
INSERT INTO public.galaxy VALUES (3, 'MlkWy', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (4, 'MilkyWay', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (5, 'MilkyWay a', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (6, 'MilkyWay b', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (7, 'MilkyWay c', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (8, 'MilkyWay d', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (9, 'MilkyWay e', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (10, 'MilkyWay f', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (11, 'MilkyWay g', 100, true, 30.00, 12, 'a');
INSERT INTO public.galaxy VALUES (2, 'elpepe', 101, true, 10.00, 30, 'b');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'tierra', 100, true, 91);
INSERT INTO public.moon VALUES (2, 'earth', 100, true, 92);
INSERT INTO public.moon VALUES (3, 'pluto', 100, true, 93);
INSERT INTO public.moon VALUES (4, 'mars', 100, true, 94);
INSERT INTO public.moon VALUES (5, 'ouranos', 100, true, 96);
INSERT INTO public.moon VALUES (6, 'ur anus', 100, true, 96);
INSERT INTO public.moon VALUES (7, 'urano', 100, true, 97);
INSERT INTO public.moon VALUES (8, 'oouranos', 100, true, 98);
INSERT INTO public.moon VALUES (9, 'tu ano', 100, true, 99);
INSERT INTO public.moon VALUES (10, 'mercury', 100, true, 104);
INSERT INTO public.moon VALUES (11, 'fredy', 100, true, 103);
INSERT INTO public.moon VALUES (12, 'pluton', 100, true, 98);
INSERT INTO public.moon VALUES (13, 'mickey', 100, true, 101);
INSERT INTO public.moon VALUES (14, 'goofy', 100, true, 100);
INSERT INTO public.moon VALUES (15, 'pepe', 100, true, 91);
INSERT INTO public.moon VALUES (16, 'etsech', 100, true, 92);
INSERT INTO public.moon VALUES (17, 'aguila', 100, true, 93);
INSERT INTO public.moon VALUES (18, 'mapache', 100, true, 94);
INSERT INTO public.moon VALUES (19, 'ouran', 100, true, 96);
INSERT INTO public.moon VALUES (20, 'anus', 100, true, 96);
INSERT INTO public.moon VALUES (21, 'pan', 100, true, 97);
INSERT INTO public.moon VALUES (22, 'gea', 100, true, 98);
INSERT INTO public.moon VALUES (23, 'ano', 100, true, 99);
INSERT INTO public.moon VALUES (24, 'manolo', 100, true, 104);
INSERT INTO public.moon VALUES (25, 'vega', 100, true, 103);
INSERT INTO public.moon VALUES (26, 'luna', 100, true, 98);
INSERT INTO public.moon VALUES (27, 'oi', 100, true, 101);
INSERT INTO public.moon VALUES (28, 'pete', 100, true, 100);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (91, 'tierra', 100, true, 15);
INSERT INTO public.planet VALUES (92, 'earth', 100, true, 24);
INSERT INTO public.planet VALUES (93, 'pluto', 100, true, 22);
INSERT INTO public.planet VALUES (94, 'mars', 100, true, 21);
INSERT INTO public.planet VALUES (95, 'ouranos', 100, true, 26);
INSERT INTO public.planet VALUES (96, 'ur anus', 100, true, 26);
INSERT INTO public.planet VALUES (97, 'urano', 100, true, 27);
INSERT INTO public.planet VALUES (98, 'oouranos', 100, true, 18);
INSERT INTO public.planet VALUES (99, 'tu ano', 100, true, 19);
INSERT INTO public.planet VALUES (100, 'mercury', 100, true, 20);
INSERT INTO public.planet VALUES (101, 'fredy', 100, true, 19);
INSERT INTO public.planet VALUES (102, 'pluton', 100, true, 28);
INSERT INTO public.planet VALUES (103, 'mickey', 100, true, 27);
INSERT INTO public.planet VALUES (104, 'goofy', 100, true, 16);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (15, 'perseus', 100, true, 11);
INSERT INTO public.star VALUES (16, 'egalabalus', 100, true, 4);
INSERT INTO public.star VALUES (17, 'athena', 100, true, 2);
INSERT INTO public.star VALUES (18, 'poseidon', 100, true, 11);
INSERT INTO public.star VALUES (19, 'zeus', 100, true, 6);
INSERT INTO public.star VALUES (20, 'ursa minor', 100, true, 6);
INSERT INTO public.star VALUES (21, 'ursa major', 100, true, 7);
INSERT INTO public.star VALUES (22, 'polux', 100, true, 8);
INSERT INTO public.star VALUES (23, 'castor', 100, true, 9);
INSERT INTO public.star VALUES (24, 'betelgeuse', 100, true, 10);
INSERT INTO public.star VALUES (25, 'ouroboros', 100, true, 9);
INSERT INTO public.star VALUES (26, 'orion', 100, true, 9);
INSERT INTO public.star VALUES (27, 'chariot', 100, true, 3);
INSERT INTO public.star VALUES (28, 'scorpio', 100, true, 4);


--
-- Name: constelation_constelation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.constelation_constelation_id_seq', 11, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 11, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 28, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 104, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 28, true);


--
-- Name: constelation constelation_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constelation
    ADD CONSTRAINT constelation_name_key UNIQUE (name);


--
-- Name: constelation constelation_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constelation
    ADD CONSTRAINT constelation_pkey PRIMARY KEY (constelation_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: constelation constelation_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constelation
    ADD CONSTRAINT constelation_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: moon moon_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_star_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--


