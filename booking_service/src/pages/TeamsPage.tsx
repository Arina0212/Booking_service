import Header from '../components/Header';

export default function TeamsPage() {
    return (
        <>
            <Header />
            <main className="teams">
                <div className="teams__input input_white">
                    <input className="input_white-field" type="text" placeholder="Поиск" />
                    <div className="input_white-search">
                        <img src="/svg/searchIcon.svg" alt="search" draggable="false" />
                    </div>
                </div>

                <button className="teams__btn btn_black">Создать команду</button>

                <h2>Мои команды</h2>

                <a href="" className="teams__team">
                    <div className="teams__team-pic">
                        <img src="/svg/event/defaultBanner.svg" alt="team" />
                    </div>

                    <h3>Лучшая команда в мире с названием Kovcheg</h3>

                    <div className="teams__team-amount">
                        <div className="teams__team-amount-pic">
                            <img src="/svg/countMan.svg" alt="count" />
                        </div>

                        <p>34 человека</p>
                    </div>
                </a>
                <a href="" className="teams__team">
                    <div className="teams__team-pic">
                        <img src="/svg/event/defaultBanner.svg" alt="team" />
                    </div>

                    <h3>Лучшая команда в мире с названием Kovcheg</h3>

                    <div className="teams__team-amount">
                        <div className="teams__team-amount-pic">
                            <img src="/svg/countMan.svg" alt="count" />
                        </div>

                        <p>34 человека</p>
                    </div>
                </a>
                <a href="" className="teams__team">
                    <div className="teams__team-pic">
                        <img src="/svg/event/defaultBanner.svg" alt="team" />
                    </div>

                    <h3>Лучшая команда в мире с названием Kovcheg</h3>

                    <div className="teams__team-amount">
                        <div className="teams__team-amount-pic">
                            <img src="/svg/countMan.svg" alt="count" />
                        </div>

                        <p>34 человека</p>
                    </div>
                </a>
            </main>
        </>
    );
}
