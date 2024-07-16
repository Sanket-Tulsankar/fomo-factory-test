import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setId } from '../redux/store/dataState';

const GetId: React.FC = () => {
    const [newId, setNewId] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setId(newId));
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>New Id: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newId}
                                        onChange={(e) => setNewId(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetId;
