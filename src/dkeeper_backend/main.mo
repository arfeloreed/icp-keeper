import List "mo:base/List";
// import Debug "mo:base/Debug";

actor {
  public type Note = {
    title: Text;
    content: Text;
  };

  var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
  };

  public query func getNotes(): async [Note] {
    return List.toArray(notes);
  };

  public func deleteNote(index: Nat) {
    let target: Nat = index + 1;
    var notesA = List.take(notes, index);
    var notesB = List.drop(notes, target);
    var newNotes = List.append(notesA, notesB);
    notes := newNotes;
  };
}