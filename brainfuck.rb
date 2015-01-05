def brain_luck(code, input)
  code_arr, input_arr = code.split(''), input.split('').map(&:ord)
  mac = Machine.new code_arr, input_arr
  mac.run
end

class Machine

  def initialize instructions, input
    # Initialize data and pointer
    @data = Array.new(300, 0)
    @data_ptr = 0

    # Initialize instructions and pointer
    @inst = instructions
    @inst_ptr = 0

    @input = input
    @output = ''

    # index the '[' and corresponding ']' locations
    index_braces
  end

  def run
    loop { break if interpret.nil? }
    @output
  end


  private

  def index_braces
    stack = []
    @left_braces, @right_braces = [], []
    @inst.each_with_index do |x, i|
      stack << i if x == '['
      if x == ']'
        @left_braces << stack.pop
        @right_braces << i
      end
    end
  end

  def interpret
    case @inst[@inst_ptr]
    when '>'
      @data_ptr += 1
    when '<'
      @data_ptr -= 1
    when '+'
      @data[@data_ptr] = (datum + 1) % 256
    when '-'
      @data[@data_ptr] = (datum - 1) % 256
    when '.'
      @output += datum.chr
    when ','
      @data[@data_ptr] = @input.shift
    when '['
      lbi = @left_braces.index @inst_ptr
      @inst_ptr = @right_braces[lbi] if datum.zero?
    when ']'
      rbi = @right_braces.index @inst_ptr
      @inst_ptr = @left_braces[rbi] unless datum.zero?
    else
      return nil
    end
    @inst_ptr += 1
  end

  def datum
    @data[@data_ptr]
  end
end


puts brain_luck(',+[-.,+]', 'Codewars' + 255.chr) == 'Codewars'
puts brain_luck(',[.[-],]', 'Codewars' + 0.chr) == 'Codewars'
puts brain_luck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', 8.chr + 9.chr) == 72.chr
