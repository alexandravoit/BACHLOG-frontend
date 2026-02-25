import {NavList} from "@primer/react";

function MainMenu() {
    const path = window.location.pathname;

    return (
        <NavList>
            <NavList.Item href="/" aria-current={path === "/" ? "page" : undefined}>
                Avaleht
            </NavList.Item>

            <NavList.Item
                href="/semesters"
                aria-current={path === "/semesters" ? "page" : undefined}
            >
                Semestrid
            </NavList.Item>

            <NavList.Item
                href="/modules"
                aria-current={path === "/modules" ? "page" : undefined}
            >
                Moodulid
            </NavList.Item>
        </NavList>
    );
}

export default MainMenu;
