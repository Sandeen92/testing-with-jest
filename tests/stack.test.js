const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

//FIFO TEST
test('pushing 3 times then popping 2 times on stack should return the first element pushed', () => {
    stack.push("uno");
    stack.push("zwei");
    stack.push("три");
    stack.pop();
    stack.pop();
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe("три");
})