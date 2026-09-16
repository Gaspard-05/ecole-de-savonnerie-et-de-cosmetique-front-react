import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./SelectDropdown.css";

function SelectDropdown({ id, options, value, onChange, placeholder = "Sélectionner", error }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectOption(opt) {
    onChange(opt.value);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlighted((i) => Math.min(i + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && open && highlighted >= 0) {
      e.preventDefault();
      selectOption(options[highlighted]);
    }
  }

  return (
    <div className="select-dropdown" ref={ref} onKeyDown={handleKeyDown}>
      <button
        type="button"
        id={id}
        className={`select-dropdown__trigger ${error ? "select-dropdown__trigger--error" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selected ? "" : "select-dropdown__placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`select-dropdown__chevron ${open ? "select-dropdown__chevron--open" : ""}`}
        />
      </button>

      {open && (
        <ul className="select-dropdown__panel" role="listbox">
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`select-dropdown__option ${i === highlighted ? "select-dropdown__option--highlighted" : ""} ${
                opt.value === value ? "select-dropdown__option--selected" : ""
              }`}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => selectOption(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectDropdown;
