import { useEffect, useMemo, useRef, useState } from "react";
import { lessonContent } from "./lessonContent";
import OrbitLab from "./OrbitLab";

const lessons = [
  {
    id: 1,
    title: "Tổng quan",
    category: "Nền tảng",
    time: "5 phút",
    image: "deep-field.webp",
    credit: "NASA · Hubble Deep Field",
    color: "violet",
    topics: [
      "Lịch sử thiên văn học",
      "Vai trò của thiên văn học trong cuộc sống hiện đại",
      "Vị trí của chúng ta trong vũ trụ",
    ],
    intro: "Bắt đầu từ câu hỏi lớn nhất: chúng ta đang ở đâu trong vũ trụ?",
  },
  {
    id: 2,
    title: "Chuyển động của bầu trời",
    category: "Quan sát",
    time: "5 phút",
    image: "eclipse.webp",
    credit: "NASA · nhật thực toàn phần",
    color: "amber",
    topics: [
      "Chuyển động cơ bản của Trái Đất",
      "Sự biến đổi của bầu trời theo ngày và theo năm",
      "Các hiện tượng quang học liên quan tới Mặt Trời và Mặt Trăng",
    ],
    intro:
      "Tìm quy luật trong những chuyển động tưởng như vô tận trên bầu trời.",
  },
  {
    id: 3,
    title: "Các chòm sao",
    category: "Quan sát",
    time: "5 phút",
    image: "orion.gif",
    credit: "NASA · Chòm sao Orion",
    color: "blue",
    topics: [
      "Khái niệm, lịch sử và qui ước",
      "Danh sách các chòm sao hiện đại",
      "Xác định các chòm sao bằng bản đồ và ứng dụng",
    ],
    intro: "Học cách biến những chấm sáng thành bản đồ của bầu trời đêm.",
  },
  {
    id: 4,
    title: "Cơ sở thiên văn học của Dương lịch và Âm lịch",
    category: "Quan sát",
    time: "5 phút",
    image: "moon.webp",
    credit: "NASA · Mặt Trăng",
    color: "amber",
    topics: [
      "Cơ sở của Dương lịch",
      "Cơ sở của Âm lịch",
      "Ngày nhuận và tháng nhuận",
      "Các tiết khí",
    ],
    intro: "Lịch là câu chuyện về quỹ đạo, pha Mặt Trăng và thời gian.",
  },
  {
    id: 5,
    title: "Ánh sáng, bức xạ và quang phổ",
    category: "Vật lý vũ trụ",
    time: "5 phút",
    image: "nebula.webp",
    credit: "NASA · Spitzer infrared",
    color: "pink",
    topics: [
      "Các dải bức xạ điện từ",
      "Quang phổ",
      "Ánh sáng và vận tốc ánh sáng",
    ],
    intro: "Ánh sáng mang tin tức từ những nơi ta không thể chạm tới.",
  },
  {
    id: 6,
    title: "Lực hấp dẫn và trường hấp dẫn",
    category: "Vật lý vũ trụ",
    time: "5 phút",
    image: "black-hole.webp",
    credit: "NASA · Event Horizon Telescope",
    color: "violet",
    topics: [
      "Lực hấp dẫn: đặc điểm, công thức và các chuyển động dưới tác dụng của lực hấp dẫn",
      "Trường hấp dẫn trong thuyết tương đối rộng",
      "Vai trò của lực hấp dẫn trong cấu trúc và sự tiến hóa của vũ trụ",
    ],
    intro: "Theo dấu lực vô hình giữ các hành tinh, sao và thiên hà bên nhau.",
  },
  {
    id: 7,
    title: "Hệ Mặt Trời",
    category: "Hệ Mặt Trời",
    time: "5 phút",
    image: "solar-system.webp",
    credit: "NASA/JPL · Voyager & Galileo",
    color: "blue",
    topics: ["Cấu trúc", "Các hành tinh và vệ tinh", "Các thiên thể khác"],
    intro: "Đi một vòng từ Mặt Trời qua các hành tinh và thế giới nhỏ hơn.",
  },
  {
    id: 8,
    title: "Mặt Trời và sự sống",
    category: "Hệ Mặt Trời",
    time: "5 phút",
    image: "sun.webp",
    credit: "NASA/JPL-Caltech · Mặt Trời",
    color: "amber",
    topics: [
      "Đặc điểm của Mặt Trời",
      "Bức xạ Mặt Trời và vai trò với sự sống",
      "Sự sống trong Hệ Mặt Trời",
    ],
    intro:
      "Khám phá ngôi sao gần nhất và điều kiện khiến Trái Đất trở thành nhà.",
  },
  {
    id: 9,
    title: "Chuyển động quỹ đạo",
    category: "Hệ Mặt Trời",
    time: "5 phút",
    image: "earth.webp",
    credit: "NASA · Trái Đất từ không gian",
    color: "blue",
    topics: [
      "Đặc điểm quỹ đạo của các hành tinh",
      "Các định luật của Kepler về chuyển động quỹ đạo",
    ],
    intro: "Quỹ đạo kể ta nghe cách các thế giới chuyển động trong không gian.",
  },
  {
    id: 10,
    title: "Các lực và các hạt cơ bản",
    category: "Vật lý vũ trụ",
    time: "5 phút",
    image: "star-nebula.webp",
    credit: "NASA · stellar nursery",
    color: "pink",
    topics: [
      "Các lực cơ bản trong tự nhiên",
      "Các hạt cơ bản và cấu tạo của vật chất",
      "Vật chất tối",
    ],
    intro:
      "Từ hạt nhỏ nhất đến cấu trúc lớn nhất, vật chất có những quy tắc chung.",
  },
  {
    id: 11,
    title: "Sự ra đời và cái chết của một ngôi sao",
    category: "Vòng đời vũ trụ",
    time: "5 phút",
    image: "nebula.webp",
    credit: "NASA · Lagoon Nebula",
    color: "pink",
    topics: [
      "Các loại sao trong vũ trụ",
      "Sự hình thành của một ngôi sao",
      "Cái chết của một ngôi sao",
      "Supernova",
    ],
    intro:
      "Các đám mây khí sinh ra sao; những vụ nổ sao gieo mầm cho thế hệ mới.",
  },
  {
    id: 12,
    title: "Lỗ đen",
    category: "Vòng đời vũ trụ",
    time: "5 phút",
    image: "black-hole.webp",
    credit: "Event Horizon Telescope Collaboration",
    color: "violet",
    topics: [
      "Sự hình thành của lỗ đen",
      "Các đặc điểm của lỗ đen",
      "Lỗ trắng và lỗ sâu",
    ],
    intro: "Bước tới ranh giới nơi hấp dẫn bẻ cong cả đường đi của ánh sáng.",
  },
  {
    id: 13,
    title: "Các thiên hà và xa hơn",
    category: "Vũ trụ học",
    time: "5 phút",
    image: "andromeda.webp",
    credit: "NASA/JPL-Caltech · Andromeda",
    color: "blue",
    topics: [
      "Thiên hà của chúng ta",
      "Va chạm với Andromeda",
      "Các cụm thiên hà",
      "Đa vũ trụ",
    ],
    intro:
      "Rời Ngân Hà để nhìn những thành phố sao và cấu trúc vũ trụ rộng lớn.",
  },
  {
    id: 14,
    title: "Big Bang và tương lai vũ trụ",
    category: "Vũ trụ học",
    time: "5 phút",
    image: "deep-field.webp",
    credit: "NASA · Hubble Deep Field",
    color: "violet",
    topics: [
      "Sự giãn nở của vũ trụ",
      "Mô hình Big Bang",
      "Tương lai của vũ trụ",
    ],
    intro: "Lần ngược lịch sử vũ trụ và nhìn về những khả năng phía trước.",
  },
];

const categories = [
  "Tất cả",
  "Nền tảng",
  "Quan sát",
  "Vật lý vũ trụ",
  "Hệ Mặt Trời",
  "Vòng đời vũ trụ",
  "Vũ trụ học",
];
const storageKey = "orbit-learned-v1";

function Icon({ name, size = 18 }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    orbit: (
      <>
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4.5"
          transform="rotate(-35 12 12)"
        />
        <circle cx="12" cy="12" r="2" />
        <circle cx="18.5" cy="5.5" r="1" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" />
        <path d="M4 16a2.5 2.5 0 0 1 2.5-2.5H20" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function loadProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(value)
      ? [
          ...new Set(
            value.filter(
              (id) => Number.isInteger(id) && id >= 1 && id <= lessons.length,
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [completed, setCompleted] = useState(loadProgress);
  const [filter, setFilter] = useState("Tất cả");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [answer, setAnswer] = useState(null);
  const dialogRef = useRef(null);
  const searchRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completed));
    } catch {
      setStorageAvailable(false);
    }
  }, [completed]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !selected
      ) {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({ block: "center" });
      }
      if (event.key === "Escape") setMobileNav(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);
  useEffect(() => {
    const dialog = dialogRef.current;
    setAnswer(null);
    if (selected) {
      dialog.showModal();
      dialog.querySelector(".lesson-drawer")?.scrollTo(0, 0);
    } else dialog.close();
    document.body.style.overflow = selected || mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, mobileNav]);

  useEffect(() => {
    if (!mobileNav) return undefined;
    const sidebar = sidebarRef.current;
    const slideDuration =
      parseFloat(getComputedStyle(sidebar).transitionDuration) * 1000;
    const focusTimer = setTimeout(
      () => sidebar.querySelector("a")?.focus(),
      slideDuration + 32,
    );
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const controls = [...sidebar.querySelectorAll("a, button")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", trapFocus);
      menuRef.current?.focus();
    };
  }, [mobileNav]);

  const visibleLessons = useMemo(
    () =>
      lessons.filter((lesson) => {
        const matchCategory = filter === "Tất cả" || lesson.category === filter;
        const normalize = (value) =>
          value
            .toLocaleLowerCase("vi")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d");
        const term = normalize(query.trim());
        const matchQuery =
          !term ||
          normalize(
            `${lesson.title} ${lesson.category} ${lesson.topics.join(" ")}`,
          ).includes(term);
        const matchDone = !showDone || completed.includes(lesson.id);
        return matchCategory && matchQuery && matchDone;
      }),
    [filter, query, showDone, completed],
  );

  const toggleComplete = (id) =>
    setCompleted((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  const current =
    lessons.find((lesson) => !completed.includes(lesson.id)) || lessons[0];
  const percent = Math.round((completed.length / lessons.length) * 100);
  const reading = selected ? lessonContent[selected.id] : null;
  const resetFilters = () => {
    setFilter("Tất cả");
    setQuery("");
    setShowDone(false);
  };

  return (
    <div className="app-shell">
      <aside
        ref={sidebarRef}
        id="primary-sidebar"
        role={mobileNav ? "dialog" : undefined}
        aria-modal={mobileNav || undefined}
        aria-label="Điều hướng học tập"
        className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}
      >
        <a className="brand" href="#home" aria-label="Quỹ đạo, trang chủ">
          <span className="brand-symbol">
            <Icon name="orbit" size={22} />
          </span>
          <span>
            quỹ đạo<span className="brand-dot">.</span>
          </span>
        </a>
        <div className="nav-label">KHÁM PHÁ</div>
        <nav className="side-nav" aria-label="Điều hướng chính">
          <a
            className={`nav-link ${!showDone ? "active" : ""}`}
            href="#lessons"
            onClick={() => {
              resetFilters();
              setMobileNav(false);
            }}
          >
            <Icon name="book" /> Lộ trình học
          </a>
          <button
            className={`nav-link ${showDone ? "active" : ""}`}
            onClick={() => {
              setShowDone((value) => !value);
              setMobileNav(false);
              document
                .querySelector("#lessons")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Icon name="check" /> Đã hoàn thành{" "}
            <span className="nav-count">{completed.length}</span>
          </button>
        </nav>
        <div className="sidebar-rule" />
        <div className="nav-label">CHỦ ĐỀ</div>
        <nav className="topic-nav" aria-label="Lọc theo chủ đề">
          {categories.slice(1).map((category, index) => (
            <button
              key={category}
              aria-pressed={filter === category}
              className={`topic-link ${filter === category ? "topic-active" : ""}`}
              onClick={() => {
                setFilter(filter === category ? "Tất cả" : category);
                setShowDone(false);
                setMobileNav(false);
                document
                  .querySelector("#lessons")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className={`topic-mark mark-${index}`} />
              {category}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="orbit-sketch" aria-hidden="true">
            <i />
            <b />
            <span />
          </div>
          <p>Mỗi câu hỏi là một cánh cửa mở ra vũ trụ.</p>
          <small>14 bài học · học theo nhịp riêng</small>
        </div>
        <button
          className="nav-dismiss"
          aria-label="Đóng menu"
          onClick={() => setMobileNav(false)}
        >
          <Icon name="close" />
        </button>
      </aside>

      <main
        className="main-area"
        id="home"
        aria-hidden={mobileNav || undefined}
      >
        <header className="topbar">
          <button
            ref={menuRef}
            className="menu-toggle"
            aria-expanded={mobileNav}
            aria-controls="primary-sidebar"
            onClick={() => setMobileNav(true)}
            aria-label="Mở menu"
          >
            <span />
            <span />
          </button>
          <div className="breadcrumbs">
            <span>Không gian học tập</span>
            <b>/</b>
            <strong>Thiên văn học</strong>
          </div>
          <div className="topbar-right">
            <span className="saved-chip">
              <i />{" "}
              {storageAvailable
                ? "Tiến độ lưu trên thiết bị này"
                : "Tiến độ chỉ lưu trong phiên này"}
            </span>
            <span
              className="avatar"
              aria-label="Đang khám phá không cần tài khoản"
            >
              <Icon name="orbit" size={17} />
            </span>
          </div>
        </header>

        <div className="content-wrap">
          <section className="welcome-row">
            <div>
              <h1>
                Chào bạn, <em>nhà du hành.</em>
              </h1>
              <p className="welcome-copy">
                Vũ trụ rộng ơi là rộng. Mình bắt đầu từ đâu nhỉ?
              </p>
            </div>
            <div className="progress-card">
              <div className="progress-copy">
                <span>Hành trình của bạn</span>
                <strong>
                  {completed.length}
                  <small> / 14 bài học</small>
                </strong>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={completed.length}
                aria-valuemin={0}
                aria-valuemax={14}
                aria-label="Số bài đã hoàn thành"
              >
                <span style={{ transform: `scaleX(${percent / 100})` }} />
              </div>
              <div className="progress-foot">
                <span>{percent}% hoàn thành</span>
                <span>
                  {completed.length === 0
                    ? "Sẵn sàng cất cánh?"
                    : completed.length === 14
                      ? "Bạn đã đi hết lộ trình!"
                      : `${14 - completed.length} bài học đang chờ bạn`}
                </span>
              </div>
            </div>
          </section>

          <section className="feature" aria-label="Bài học tiếp theo">
            <div
              className="feature-image"
              style={{ backgroundImage: `url('/images/${current.image}')` }}
              role="img"
              aria-label={current.title}
            >
              <span className="image-credit">ẢNH: {current.credit}</span>
              <div className="feature-coordinate">
                {String(current.id).padStart(2, "0")} <i>—</i>{" "}
                {current.category.toUpperCase()}
              </div>
            </div>
            <div className="feature-content">
              <h2>
                {current.id === 1 ? (
                  <>
                    Bạn đang ở đây.
                    <br />
                    <em>Giữa vô tận.</em>
                  </>
                ) : (
                  current.title
                )}
              </h2>
              <p>{current.intro}</p>
              <button
                className="start-button"
                onClick={() => setSelected(current)}
              >
                {completed.length === 14
                  ? "Khám phá lại từ đầu"
                  : completed.length
                    ? "Tiếp tục khám phá"
                    : "Bắt đầu hành trình"}{" "}
                <Icon name="arrow" size={17} />
              </button>
              <div className="feature-bottom">
                <span>
                  BÀI {String(current.id).padStart(2, "0")} · {current.title}
                </span>
                <span className="feature-time">{current.time}</span>
              </div>
            </div>
            <div className="feature-index">
              BÀI
              <br />
              <strong>{String(current.id).padStart(2, "0")}</strong>
              <span>/ 14</span>
            </div>
          </section>

          <OrbitLab compact onOpen={() => setSelected(lessons[8])} />

          <section className="lesson-section" id="lessons">
            <div className="section-top">
              <div>
                <h2>
                  Bản đồ bài học<span className="title-period">.</span>
                </h2>
              </div>
              <p className="section-aside">
                14 chặng nhỏ, một vũ trụ bao la.
                <br />
                Chọn bất cứ nơi nào bạn muốn ghé qua.
              </p>
            </div>
            <div className="lesson-tools">
              <div className="lesson-count" aria-live="polite">
                <strong>
                  {visibleLessons.length.toString().padStart(2, "0")}
                </strong>{" "}
                <span>{showDone ? "bài đã học" : "bài học"}</span>
                {(filter !== "Tất cả" || query || showDone) && (
                  <button className="reset-filter" onClick={resetFilters}>
                    Xóa lọc
                  </button>
                )}
              </div>
              <label className="search-box">
                <Icon name="search" size={17} />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Bạn tò mò về điều gì?"
                  aria-label="Tìm bài học"
                />
                <kbd>Ctrl K</kbd>
              </label>
            </div>
            <div className="filter-row" aria-label="Lọc chủ đề">
              {categories.map((category) => (
                <button
                  key={category}
                  aria-pressed={filter === category}
                  className={`filter-chip ${filter === category ? "filter-selected" : ""}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            {visibleLessons.length ? (
              <div className="lesson-grid">
                {visibleLessons.map((lesson) => {
                  const done = completed.includes(lesson.id);
                  return (
                    <article
                      key={lesson.id}
                      className={`lesson-card ${done ? "lesson-complete" : ""}`}
                    >
                      <button
                        className="card-open"
                        onClick={() => setSelected(lesson)}
                        aria-label={`Mở bài ${lesson.id}: ${lesson.title}`}
                      >
                        <div className={`lesson-art art-${lesson.color}`}>
                          <img
                            src={`/images/${lesson.image}`}
                            alt=""
                            loading={lesson.id < 5 ? "eager" : "lazy"}
                          />
                          <span className="art-wash" />
                          <span className="lesson-number">
                            {String(lesson.id).padStart(2, "0")}
                          </span>
                          <span className="art-action">
                            <Icon name="arrow" size={16} />
                          </span>
                          {done && (
                            <span className="done-flag">
                              <Icon name="check" size={13} /> ĐÃ HỌC
                            </span>
                          )}
                          <span className="art-credit">{lesson.credit}</span>
                        </div>
                        <div className="lesson-info">
                          <div className="lesson-meta">
                            <span
                              className={`category-tag tag-${lesson.color}`}
                            >
                              {lesson.category}
                            </span>
                            <span>{lesson.time}</span>
                          </div>
                          <h3>{lesson.title}</h3>
                          <p>{lesson.intro}</p>
                          <div className="lesson-footer">
                            <span>
                              {lesson.topics.length} nội dung khám phá
                            </span>
                            <span className="lesson-cta">
                              Khám phá <Icon name="arrow" size={14} />
                            </span>
                          </div>
                        </div>
                      </button>
                      <button
                        className={`complete-toggle ${done ? "toggle-done" : ""}`}
                        onClick={() => toggleComplete(lesson.id)}
                        aria-pressed={done}
                        aria-label={
                          done
                            ? `Bỏ đánh dấu hoàn thành: ${lesson.title}`
                            : `Đánh dấu hoàn thành: ${lesson.title}`
                        }
                        title={
                          done
                            ? "Bỏ đánh dấu hoàn thành"
                            : "Đánh dấu hoàn thành"
                        }
                      >
                        {done && <Icon name="check" size={14} />}
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-orbit">
                  <Icon name="orbit" size={35} />
                </div>
                <h3>Chưa thấy chòm sao này</h3>
                <p>Thử từ khóa khác hoặc xóa bộ lọc để xem toàn bộ lộ trình.</p>
                <button
                  onClick={() => {
                    setFilter("Tất cả");
                    setQuery("");
                    setShowDone(false);
                  }}
                >
                  Xem tất cả bài học <Icon name="arrow" size={15} />
                </button>
              </div>
            )}
          </section>

          <footer className="page-footer">
            <a href="/images/SOURCES.md" target="_blank" rel="noreferrer">
              Ảnh thật từ NASA & các đài quan sát
            </a>
            <span>
              Học theo nhịp riêng của bạn <Icon name="orbit" size={14} />
            </span>
          </footer>
        </div>
      </main>

      <dialog
        ref={dialogRef}
        className="drawer-dialog"
        aria-labelledby="drawer-title"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setSelected(null);
        }}
      >
        {selected && (
          <article className="lesson-drawer">
            <div
              className="drawer-image"
              style={{ backgroundImage: `url('/images/${selected.image}')` }}
            >
              <span className="image-credit">ẢNH: {selected.credit}</span>
              <button
                autoFocus
                className="drawer-close"
                onClick={() => setSelected(null)}
                aria-label="Đóng bài học"
              >
                <Icon name="close" />
              </button>
              <span className="drawer-index">
                BÀI {String(selected.id).padStart(2, "0")} / 14
              </span>
            </div>
            <div className="drawer-body">
              <div className="lesson-meta">
                <span className={`category-tag tag-${selected.color}`}>
                  {selected.category}
                </span>
                <span>{selected.time} khám phá</span>
              </div>
              <h2 id="drawer-title">{selected.title}</h2>
              <p className="drawer-intro">{selected.intro}</p>
              {selected.id === 9 && <OrbitLab />}
              <div className="reading-sections">
                {selected.topics.map((topic, index) => (
                  <section key={topic}>
                    <h3>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {topic}
                    </h3>
                    <p>{reading.reading[index]}</p>
                  </section>
                ))}
              </div>
              <a
                className="lesson-source"
                href={reading.source[1]}
                target="_blank"
                rel="noreferrer"
              >
                Đọc thêm: {reading.source[0]} <Icon name="arrow" size={14} />
              </a>
              <fieldset className="lesson-quiz">
                <legend>Thử nhớ một chút</legend>
                <p>{reading.question}</p>
                <div className="quiz-options">
                  {reading.options.map((option, index) => (
                    <button
                      key={option}
                      aria-pressed={answer === index}
                      className={
                        answer === index
                          ? index === reading.correct
                            ? "answer-correct"
                            : "answer-wrong"
                          : ""
                      }
                      onClick={() => setAnswer(index)}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                      {answer === index && index === reading.correct && (
                        <Icon name="check" size={15} />
                      )}
                    </button>
                  ))}
                </div>
                {answer !== null && (
                  <p
                    role="status"
                    className={`quiz-feedback ${answer === reading.correct ? "feedback-correct" : ""}`}
                  >
                    <strong>
                      {answer === reading.correct
                        ? "Đúng rồi!"
                        : "Thử lại nhé."}
                    </strong>{" "}
                    {answer === reading.correct
                      ? reading.explanation
                      : "Đọc lại ý chính phía trên rồi chọn một đáp án khác."}
                  </p>
                )}
              </fieldset>
              <button
                className={`drawer-complete ${completed.includes(selected.id) ? "is-complete" : ""}`}
                onClick={() => toggleComplete(selected.id)}
              >
                {completed.includes(selected.id) ? (
                  <>
                    <Icon name="check" /> Đã hoàn thành · Hoàn tác
                  </>
                ) : (
                  <>
                    Đánh dấu đã hoàn thành <Icon name="arrow" size={16} />
                  </>
                )}
              </button>
              <div className="lesson-pagination">
                <button
                  disabled={selected.id === 1}
                  onClick={() => setSelected(lessons[selected.id - 2])}
                >
                  Bài trước
                </button>
                <span>{selected.id} / 14</span>
                <button
                  disabled={selected.id === 14}
                  onClick={() => setSelected(lessons[selected.id])}
                >
                  Bài tiếp theo <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          </article>
        )}
      </dialog>
      {mobileNav && (
        <button
          className="mobile-scrim"
          aria-label="Đóng menu"
          onClick={() => setMobileNav(false)}
        />
      )}
    </div>
  );
}
