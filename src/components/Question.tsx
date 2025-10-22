interface QuestionProps {
  question: string;
  answers: Array<{ value: number; text: string }>;
  selected: number | undefined;
  onChange: (value: number) => void;
}

export function Question({ question, answers, selected, onChange }: QuestionProps) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg mb-4 text-slate-900">{question}</h3>
      <div className="space-y-3">
        {answers.map((answer) => (
          <label
            key={answer.value}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selected === answer.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name={question}
              value={answer.value}
              checked={selected === answer.value}
              onChange={() => onChange(answer.value)}
              className="mr-3 cursor-pointer w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className={`font-medium ${
              selected === answer.value ? 'text-blue-900' : 'text-slate-700'
            }`}>
              {answer.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
