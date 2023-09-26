package com.aliaydin.todo.service.impl;

import com.aliaydin.todo.dto.TodoDto;
import com.aliaydin.todo.entity.Todo;
import com.aliaydin.todo.exception.ResourceNotFoundException;
import com.aliaydin.todo.repository.TodoRepository;
import com.aliaydin.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {

        //Convert todoDto to Todo Jpa Entity
        Todo todo = modelMapper.map(todoDto, Todo.class);

        //Save Todo Jpa Entity to db
        Todo savedTodo = todoRepository.save(todo);

        //Convert savedTodo Jpa Entity to TodoDto object
        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);

        return savedTodoDto;
    }

    @Override
    public TodoDto getTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo with id: " + id + " not found..!"));

        return modelMapper.map(todo, TodoDto.class);
    }


    @Override
    public List<TodoDto> getAllTodos() {

        List<Todo> todos = todoRepository.findAll();

        return todos.stream().map(todo -> modelMapper.map(todo, TodoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo with id: " + id + " not found..!"));

        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);

        return modelMapper.map(updatedTodo,TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo with id: " + id + " not found..!"));

        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo with id: " + id + " not found..!"));

        todo.setCompleted(Boolean.TRUE);

        Todo completedTodo = todoRepository.save(todo);

        return modelMapper.map(completedTodo, TodoDto.class);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Todo with id: " + id + " not found..!"));

        todo.setCompleted(Boolean.FALSE);

        Todo completedTodo = todoRepository.save(todo);

        return modelMapper.map(completedTodo, TodoDto.class);
    }
}
